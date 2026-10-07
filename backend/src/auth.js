const {
  createHmac,
  randomBytes,
  scrypt: scryptCallback,
  timingSafeEqual,
} = require("node:crypto");
const { promisify } = require("node:util");

const scrypt = promisify(scryptCallback);
const PASSWORD_COST = 1 << 15;
const PASSWORD_BLOCK_SIZE = 8;
const PASSWORD_PARALLELIZATION = 1;
const PASSWORD_KEY_LENGTH = 64;

async function hashPassword(password) {
  const salt = randomBytes(16);
  const key = await scrypt(password, salt, PASSWORD_KEY_LENGTH, {
    N: PASSWORD_COST,
    r: PASSWORD_BLOCK_SIZE,
    p: PASSWORD_PARALLELIZATION,
    maxmem: 64 * 1024 * 1024,
  });

  return [
    "scrypt",
    PASSWORD_COST,
    PASSWORD_BLOCK_SIZE,
    PASSWORD_PARALLELIZATION,
    salt.toString("base64url"),
    key.toString("base64url"),
  ].join("$");
}

async function verifyPassword(password, storedHash) {
  const [algorithm, cost, blockSize, parallelization, saltText, keyText] =
    String(storedHash || "").split("$");
  if (
    algorithm !== "scrypt" ||
    Number(cost) !== PASSWORD_COST ||
    Number(blockSize) !== PASSWORD_BLOCK_SIZE ||
    Number(parallelization) !== PASSWORD_PARALLELIZATION ||
    !saltText ||
    !keyText
  ) {
    return false;
  }

  const expected = Buffer.from(keyText, "base64url");
  if (expected.length !== PASSWORD_KEY_LENGTH) return false;
  const actual = await scrypt(
    password,
    Buffer.from(saltText, "base64url"),
    expected.length,
    {
      N: Number(cost),
      r: Number(blockSize),
      p: Number(parallelization),
      maxmem: 64 * 1024 * 1024,
    },
  );
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function signToken(user, secret, now = Math.floor(Date.now() / 1000)) {
  const header = encode({ alg: "HS256", typ: "JWT" });
  const payload = encode({
    sub: String(user.id),
    role: user.role,
    iat: now,
    exp: now + 60 * 60 * 12,
  });
  const data = `${header}.${payload}`;
  const signature = createHmac("sha256", secret).update(data).digest("base64url");
  return `${data}.${signature}`;
}

function verifyToken(token, secret, now = Math.floor(Date.now() / 1000)) {
  const parts = String(token || "").split(".");
  if (parts.length !== 3) return null;

  const [header, payload, signature] = parts;
  const expected = createHmac("sha256", secret).update(`${header}.${payload}`).digest();
  let received;
  try {
    received = Buffer.from(signature, "base64url");
  } catch {
    return null;
  }
  if (received.length !== expected.length || !timingSafeEqual(received, expected)) return null;

  try {
    const decodedHeader = JSON.parse(Buffer.from(header, "base64url").toString("utf8"));
    const claims = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (decodedHeader.alg !== "HS256" || !claims.sub || !claims.role || claims.exp <= now) {
      return null;
    }
    return { id: claims.sub, role: claims.role };
  } catch {
    return null;
  }
}

function encode(value) {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

module.exports = { hashPassword, signToken, verifyPassword, verifyToken };
