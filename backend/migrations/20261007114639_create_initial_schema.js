exports.up = (pgm) => {
  pgm.sql(`
    CREATE TABLE users (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name TEXT NOT NULL CHECK (length(trim(name)) > 0),
      email TEXT NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('PROFESSOR', 'ADMIN')),
      status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE UNIQUE INDEX users_email_lower_unique ON users (lower(email));

    CREATE TABLE areas (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name TEXT NOT NULL UNIQUE CHECK (length(trim(name)) > 0),
      status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE criteria (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name TEXT NOT NULL UNIQUE CHECK (length(trim(name)) > 0),
      description TEXT,
      status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE event_periods (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      name TEXT NOT NULL CHECK (length(trim(name)) > 0),
      type TEXT NOT NULL CHECK (type IN ('INSCRICAO', 'AVALIACAO')),
      start_at TIMESTAMPTZ NOT NULL,
      end_at TIMESTAMPTZ NOT NULL,
      status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      CHECK (end_at > start_at)
    );

    CREATE TABLE projects (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      title TEXT NOT NULL CHECK (length(trim(title)) > 0),
      area_id BIGINT NOT NULL REFERENCES areas(id) ON DELETE RESTRICT,
      responsible_professor_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
      summary TEXT NOT NULL,
      objectives TEXT NOT NULL,
      methodology TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'INSCRITO'
        CHECK (status IN ('INSCRITO', 'EM_AVALIACAO', 'AVALIADO', 'CLASSIFICADO')),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE project_members (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      name TEXT NOT NULL CHECK (length(trim(name)) > 0),
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );

    CREATE TABLE evaluations (
      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      evaluator_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
      scores JSONB NOT NULL CHECK (jsonb_typeof(scores) = 'object'),
      comment TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      UNIQUE (project_id, evaluator_id)
    );

    CREATE INDEX projects_area_id_idx ON projects (area_id);
    CREATE INDEX projects_status_idx ON projects (status);
    CREATE INDEX evaluations_project_id_idx ON evaluations (project_id);
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TABLE evaluations;
    DROP TABLE project_members;
    DROP TABLE projects;
    DROP TABLE event_periods;
    DROP TABLE criteria;
    DROP TABLE areas;
    DROP TABLE users;
  `);
};
