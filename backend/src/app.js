const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const pool = require("./db/pool");
const { hashPassword, signToken, verifyPassword, verifyToken } = require("./auth");

const app = express();
const developmentJwtSecret = require("node:crypto").randomBytes(32).toString("hex");

app.disable("x-powered-by");
app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      const allowedOrigins = [
        process.env.CORS_ORIGIN,
        ...(process.env.NODE_ENV === "production"
          ? []
          : ["http://localhost:5173", "http://127.0.0.1:5173"]),
      ].filter(Boolean);
      callback(null, allowedOrigins.includes(origin));
    },
  }),
);
app.use(express.json({ limit: "1mb" }));
app.locals.pool = pool;
app.locals.jwtSecret = process.env.JWT_SECRET || developmentJwtSecret;
if (
  process.env.NODE_ENV === "production" &&
  Buffer.byteLength(process.env.JWT_SECRET || "") < 32
) {
  throw new Error("JWT_SECRET must contain at least 32 bytes in production.");
}

app.get("/api/v1/health", (_request, response) => {
  response.status(200).json({ status: "ok" });
});

app.post("/api/v1/auth/register", async (request, response, next) => {
  const { name, email, password } = request.body || {};
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

  if (
    typeof name !== "string" ||
    !name.trim() ||
    name.trim().length > 200 ||
    !isValidEmail(normalizedEmail) ||
    typeof password !== "string" ||
    password.length < 8
  ) {
    return response.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Informe nome, e-mail válido e senha com pelo menos 8 caracteres.",
      },
    });
  }

  try {
    const passwordHash = await hashPassword(password);
    const result = await app.locals.pool.query(
      `INSERT INTO users (name, email, password_hash, role, status)
       VALUES ($1, $2, $3, 'PROFESSOR', 'ACTIVE')
       RETURNING id, name, email, role`,
      [name.trim(), normalizedEmail, passwordHash],
    );
    const user = publicUser(result.rows[0]);
    return response.status(201).json({
      token: signToken(user, app.locals.jwtSecret),
      user,
    });
  } catch (error) {
    if (error.code === "23505") {
      return response.status(409).json({
        error: { code: "EMAIL_ALREADY_EXISTS", message: "Este e-mail já está cadastrado." },
      });
    }
    return next(error);
  }
});

app.post("/api/v1/auth/login", async (request, response, next) => {
  const { email, password } = request.body || {};
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  if (!isValidEmail(normalizedEmail) || typeof password !== "string" || !password) {
    return response.status(400).json({
      error: { code: "VALIDATION_ERROR", message: "Informe um e-mail válido e sua senha." },
    });
  }

  try {
    const result = await app.locals.pool.query(
      `SELECT id, name, email, password_hash, role, status
       FROM users
       WHERE lower(email) = $1`,
      [normalizedEmail],
    );
    const account = result.rows[0];
    if (
      !account ||
      account.status !== "ACTIVE" ||
      !(await verifyPassword(password, account.password_hash))
    ) {
      return response.status(401).json({
        error: { code: "INVALID_CREDENTIALS", message: "E-mail ou senha inválidos." },
      });
    }

    const user = publicUser(account);
    return response.status(200).json({
      token: signToken(user, app.locals.jwtSecret),
      user,
    });
  } catch (error) {
    return next(error);
  }
});

app.get("/api/v1/areas", requireAuth, async (request, response, next) => {
  try {
    const result = await app.locals.pool.query(
      "SELECT id, name, status FROM areas ORDER BY name",
    );
    response.json({ areas: result.rows });
  } catch (error) {
    next(error);
  }
});

app.get("/api/v1/criteria", requireAuth, async (request, response, next) => {
  try {
    const result = await app.locals.pool.query(
      "SELECT id, name, description, status FROM criteria ORDER BY name",
    );
    response.json({ criteria: result.rows });
  } catch (error) {
    next(error);
  }
});

app.get("/api/v1/event-periods", requireAuth, async (request, response, next) => {
  try {
    const result = await app.locals.pool.query(
      `SELECT id, name, type, start_at, end_at, status
       FROM event_periods
       ORDER BY start_at, id`,
    );
    response.json({ event_periods: result.rows });
  } catch (error) {
    next(error);
  }
});

app.get("/api/v1/projects", requireAuth, async (request, response, next) => {
  const { area_id: areaId, status, search } = request.query;
  if (
    (areaId && !/^\d+$/.test(areaId)) ||
    (status && !["INSCRITO", "EM_AVALIACAO", "AVALIADO", "CLASSIFICADO"].includes(status)) ||
    (search && (typeof search !== "string" || search.length > 100))
  ) {
    return response.status(400).json({
      error: { code: "VALIDATION_ERROR", message: "Um ou mais filtros são inválidos." },
    });
  }

  const conditions = [];
  const values = [];
  if (areaId) {
    values.push(areaId);
    conditions.push(`p.area_id = $${values.length}`);
  }
  if (status) {
    values.push(status);
    conditions.push(`p.status = $${values.length}`);
  }
  if (search) {
    values.push(`%${search}%`);
    conditions.push(`p.title ILIKE $${values.length}`);
  }

  try {
    const result = await app.locals.pool.query(
      `${projectSelect}
       ${conditions.length ? `WHERE ${conditions.join(" AND ")}` : ""}
       ORDER BY p.created_at DESC, p.id DESC`,
      values,
    );
    response.json({ projects: result.rows });
  } catch (error) {
    next(error);
  }
});

app.get("/api/v1/projects/:id", requireAuth, async (request, response, next) => {
  if (!/^\d+$/.test(request.params.id)) {
    return response.status(400).json({
      error: { code: "VALIDATION_ERROR", message: "Identificador de projeto inválido." },
    });
  }

  try {
    const result = await app.locals.pool.query(
      `${projectSelect} WHERE p.id = $1`,
      [request.params.id],
    );
    if (!result.rows[0]) {
      return response.status(404).json({
        error: { code: "NOT_FOUND", message: "Projeto não encontrado." },
      });
    }
    response.json({ project: result.rows[0] });
  } catch (error) {
    next(error);
  }
});

app.get("/api/v1/projects/:id/evaluations", requireAuth, async (request, response, next) => {
  if (!/^\d+$/.test(request.params.id)) {
    return response.status(400).json({
      error: { code: "VALIDATION_ERROR", message: "Identificador de projeto inválido." },
    });
  }

  try {
    const result = await app.locals.pool.query(
      `SELECT e.id, e.project_id, e.evaluator_id, u.name AS evaluator_name,
              e.scores, e.comment, e.created_at, e.updated_at
       FROM evaluations e
       JOIN users u ON u.id = e.evaluator_id
       WHERE e.project_id = $1
       ORDER BY e.created_at`,
      [request.params.id],
    );
    response.json({ evaluations: result.rows });
  } catch (error) {
    next(error);
  }
});

app.get("/api/v1/results", requireAuth, async (request, response, next) => {
  const { area_id: areaId, status } = request.query;
  if (
    (areaId && !/^\d+$/.test(areaId)) ||
    (status && !["INSCRITO", "EM_AVALIACAO", "AVALIADO", "CLASSIFICADO"].includes(status))
  ) {
    return response.status(400).json({
      error: { code: "VALIDATION_ERROR", message: "Um ou mais filtros são inválidos." },
    });
  }

  const conditions = ["p.id IN (SELECT project_id FROM evaluations GROUP BY project_id HAVING count(*) >= 2)"];
  const values = [];
  if (areaId) {
    values.push(areaId);
    conditions.push(`p.area_id = $${values.length}`);
  }
  if (status) {
    values.push(status);
    conditions.push(`p.status = $${values.length}`);
  }

  try {
    const result = await app.locals.pool.query(
      `SELECT p.id AS project_id, p.title, p.status, p.responsible_professor_id,
              u.name AS responsible_professor_name,
              json_build_object('id', a.id, 'name', a.name) AS area,
              json_agg(
                json_build_object(
                  'id', e.id,
                  'evaluator_id', e.evaluator_id,
                  'evaluator_name', evaluator.name,
                  'scores', e.scores
                ) ORDER BY e.created_at
              ) AS evaluations,
              count(e.id)::int AS evaluations_count
       FROM projects p
       JOIN areas a ON a.id = p.area_id
       JOIN users u ON u.id = p.responsible_professor_id
       JOIN evaluations e ON e.project_id = p.id
       JOIN users evaluator ON evaluator.id = e.evaluator_id
       WHERE ${conditions.join(" AND ")}
       GROUP BY p.id, a.id, u.id
       ORDER BY p.created_at DESC`,
      values,
    );
    const results = result.rows.map((project) => {
      const scores = project.evaluations.flatMap((evaluation) =>
        Object.values(evaluation.scores || {}).map(Number).filter(Number.isFinite),
      );
      const finalAverage = scores.length
        ? scores.reduce((sum, score) => sum + score, 0) / scores.length
        : null;
      return { ...project, final_average: finalAverage };
    });
    response.json({ results });
  } catch (error) {
    next(error);
  }
});

app.use((_request, response) => {
  response.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: "Route not found.",
    },
  });
});

app.use((error, _request, response, _next) => {
  if (
    error.code === "ECONNREFUSED" ||
    error.code === "ENOTFOUND" ||
    error.code === "3D000" ||
    error.code === "42P01" ||
    error.code === "ECONNRESET"
  ) {
    return response.status(503).json({
      error: {
        code: "DATABASE_UNAVAILABLE",
        message: "Banco indisponível ou migration pendente. Confira DATABASE_URL e execute npm run db:migrate.",
      },
    });
  }

  const status = error.statusCode || error.status || 500;

  if (status >= 500) {
    console.error(error);
  }

  response.status(status).json({
    error: {
      code: status >= 500 ? "INTERNAL_SERVER_ERROR" : "BAD_REQUEST",
      message: status >= 500 ? "An unexpected error occurred." : error.message,
    },
  });
});

function isValidEmail(email) {
  return typeof email === "string" && email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function publicUser(user) {
  return { id: String(user.id), name: user.name, email: user.email, role: user.role };
}

function requireAuth(request, response, next) {
  const authorization = request.get("authorization") || "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  const user = match && verifyToken(match[1], request.app.locals.jwtSecret);
  if (!user || !["PROFESSOR", "ADMIN"].includes(user.role)) {
    return response.status(401).json({
      error: { code: "UNAUTHORIZED", message: "Autentique-se para acessar este recurso." },
    });
  }
  request.user = user;
  next();
}

const projectSelect = `SELECT p.id, p.title, p.area_id, p.responsible_professor_id,
  p.summary, p.objectives, p.methodology, p.status, p.created_at, p.updated_at,
  json_build_object('id', a.id, 'name', a.name) AS area,
  json_build_object('id', u.id, 'name', u.name) AS responsible_professor,
  COALESCE(
    (SELECT json_agg(json_build_object('id', pm.id, 'name', pm.name) ORDER BY pm.id)
     FROM project_members pm WHERE pm.project_id = p.id),
    '[]'::json
  ) AS members,
  (SELECT count(*)::int FROM evaluations ev WHERE ev.project_id = p.id) AS evaluations_count
  FROM projects p
  JOIN areas a ON a.id = p.area_id
  JOIN users u ON u.id = p.responsible_professor_id`;

module.exports = app;
