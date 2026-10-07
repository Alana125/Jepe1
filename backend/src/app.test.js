const assert = require("node:assert/strict");
const test = require("node:test");
const request = require("supertest");
const app = require("./app");
const { signToken } = require("./auth");

test("GET /api/v1/health returns API status", async () => {
  const response = await request(app).get("/api/v1/health");

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { status: "ok" });
});

test("unknown routes return a JSON 404", async () => {
  const response = await request(app).get("/api/v1/unknown");

  assert.equal(response.status, 404);
  assert.equal(response.body.error.code, "NOT_FOUND");
});

test("public registration creates a professor and accepts any valid email domain", async () => {
  const originalPool = app.locals.pool;
  const originalSecret = app.locals.jwtSecret;
  let savedAccount;
  app.locals.jwtSecret = "test-secret";
  app.locals.pool = {
    async query(_sql, values) {
      savedAccount = {
        id: "17",
        name: values[0],
        email: values[1],
        password_hash: values[2],
        role: "PROFESSOR",
        status: "ACTIVE",
      };
      return { rows: [savedAccount] };
    },
  };

  try {
    const response = await request(app).post("/api/v1/auth/register").send({
      name: "Professora Teste",
      email: "teste@gmail.com",
      password: "senha-segura",
      role: "ADMIN",
    });

    assert.equal(response.status, 201);
    assert.equal(response.body.user.role, "PROFESSOR");
    assert.equal(response.body.user.email, "teste@gmail.com");
    assert.ok(response.body.token);
    assert.equal("password_hash" in response.body.user, false);
    assert.match(savedAccount.password_hash, /^scrypt\$/);
  } finally {
    app.locals.pool = originalPool;
    app.locals.jwtSecret = originalSecret;
  }
});

test("login authenticates registered accounts and rejects invalid credentials", async () => {
  const originalPool = app.locals.pool;
  const originalSecret = app.locals.jwtSecret;
  let account;
  app.locals.jwtSecret = "test-secret";
  app.locals.pool = {
    async query(sql, values) {
      if (sql.startsWith("INSERT INTO users")) {
        account = {
          id: "18",
          name: values[0],
          email: values[1],
          password_hash: values[2],
          role: "PROFESSOR",
          status: "ACTIVE",
        };
        return { rows: [account] };
      }
      return { rows: account && account.email === values[0] ? [account] : [] };
    },
  };

  try {
    const registration = await request(app).post("/api/v1/auth/register").send({
      name: "Professora Teste",
      email: "teste@example.com",
      password: "senha-segura",
    });
    assert.equal(registration.status, 201);
    const login = await request(app).post("/api/v1/auth/login").send({
      email: " TESTE@example.com ",
      password: "senha-segura",
    });
    assert.equal(login.status, 200);
    assert.equal(login.body.user.role, "PROFESSOR");

    const rejected = await request(app).post("/api/v1/auth/login").send({
      email: "teste@example.com",
      password: "senha-incorreta",
    });
    assert.equal(rejected.status, 401);
  } finally {
    app.locals.pool = originalPool;
    app.locals.jwtSecret = originalSecret;
  }
});

test("registration validates fields and reports missing database setup", async () => {
  const invalid = await request(app).post("/api/v1/auth/register").send({
    name: "Professor",
    email: "nao-e-email",
    password: "123",
  });
  assert.equal(invalid.status, 400);

  const originalPool = app.locals.pool;
  app.locals.pool = {
    async query() {
      const error = new Error("connection refused");
      error.code = "ECONNREFUSED";
      throw error;
    },
  };

  try {
    const unavailable = await request(app).post("/api/v1/auth/register").send({
      name: "Professor",
      email: "professor@example.com",
      password: "senha-segura",
    });
    assert.equal(unavailable.status, 503);
    assert.equal(unavailable.body.error.code, "DATABASE_UNAVAILABLE");
  } finally {
    app.locals.pool = originalPool;
  }
});

test("authenticated read endpoints allow the loopback frontend origin", async () => {
  const originalPool = app.locals.pool;
  const originalSecret = app.locals.jwtSecret;
  app.locals.jwtSecret = "test-secret";
  app.locals.pool = {
    async query() {
      return { rows: [] };
    },
  };

  try {
    const withoutToken = await request(app).get("/api/v1/areas");
    assert.equal(withoutToken.status, 401);

    const token = signToken({ id: "1", role: "PROFESSOR" }, app.locals.jwtSecret);
    const response = await request(app)
      .get("/api/v1/areas")
      .set("Origin", "http://127.0.0.1:5173")
      .set("Authorization", `Bearer ${token}`);
    assert.equal(response.status, 200);
    assert.deepEqual(response.body, { areas: [] });
    assert.equal(response.headers["access-control-allow-origin"], "http://127.0.0.1:5173");
  } finally {
    app.locals.pool = originalPool;
    app.locals.jwtSecret = originalSecret;
  }
});
