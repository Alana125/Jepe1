# DESIGN DE API — SISTEMA JEPE

## 1. Objetivo

A API será responsável por disponibilizar os dados e operações necessárias para o frontend do Sistema JEPE.

A comunicação será realizada utilizando HTTP e formato JSON.

---

# 2. Tecnologias

- Node.js;
- Express;
- PostgreSQL;
- REST API;
- JSON;
- JWT para autenticação;
- OpenAPI/Swagger para documentação.

---

# 3. Base da API

Todas as rotas deverão utilizar o prefixo:

```text
/api/v1
```

Exemplo:

```text
/api/v1/projects
```

---

# 4. Autenticação

## POST `/api/v1/auth/login`

Realiza o login do usuário.

### Request

```json
{
  "email": "professor@ifal.edu.br",
  "password": "senha"
}
```

### Response

```json
{
  "token": "jwt-token",
  "user": {
    "id": 1,
    "name": "Professor",
    "role": "PROFESSOR"
  }
}
```

---

# 5. Professores

## GET `/api/v1/users`

Lista os usuários/professores.

## POST `/api/v1/users`

Cadastra um professor.

## PUT `/api/v1/users/:id`

Atualiza os dados do professor.

## PATCH `/api/v1/users/:id/status`

Ativa ou desativa um professor.

---

# 6. Projetos

## GET `/api/v1/projects`

Lista os projetos.

Possíveis filtros:

```text
?area_id=1
?status=EM_AVALIACAO
?search=nome
```

## POST `/api/v1/projects`

Cria um projeto.

### Exemplo

```json
{
  "title": "Projeto JEPE",
  "area_id": 1,
  "responsible_professor_id": 5,
  "members": [
    {
      "name": "Aluno 1"
    },
    {
      "name": "Aluno 2"
    }
  ],
  "summary": "Resumo do projeto",
  "objectives": "Objetivos",
  "methodology": "Metodologia"
}
```

## GET `/api/v1/projects/:id`

Consulta os detalhes de um projeto.

## PUT `/api/v1/projects/:id`

Atualiza um projeto enquanto a edição estiver permitida.

---

# 7. Avaliações

## GET `/api/v1/projects/:id/evaluations`

Lista as avaliações relacionadas ao projeto conforme as permissões do usuário.

## POST `/api/v1/projects/:id/evaluations`

Registra uma avaliação.

### Exemplo

```json
{
  "scores": {
    "1": 9,
    "2": 8,
    "3": 10
  },
  "comment": "Avaliação do projeto."
}
```

## PUT `/api/v1/projects/:id/evaluations/:evaluationId`

Atualiza a própria avaliação enquanto o período estiver aberto.

---

# 8. Resultados

## GET `/api/v1/results`

Retorna os resultados consolidados dos projetos.

### Possíveis filtros

?area_id=1
?status=CLASSIFICADO


### Exemplo de resposta

```json
{
  "results": [
    {
      "project_id": 10,
      "title": "Projeto JEPE",
      "area": "Tecnologia",
      "evaluations_count": 3,
      "final_average": 8.7,
      "status": "CLASSIFICADO"
    }
  ]
}


**Não haverá endpoint `/ranking`.**


# 9. Áreas

## GET `/api/v1/areas`

Lista as áreas.

## POST `/api/v1/areas`

Cria uma área.

## PUT `/api/v1/areas/:id`

Atualiza uma área.

## PATCH `/api/v1/areas/:id/status`

Ativa ou desativa uma área.



# 10. Critérios

## GET `/api/v1/criteria`

Lista os critérios.

## POST `/api/v1/criteria`

Cria um critério.

## PUT `/api/v1/criteria/:id`

Atualiza um critério.

## PATCH `/api/v1/criteria/:id/status`

Ativa ou desativa um critério.



# 11. Períodos

## GET `/api/v1/event-periods`

Lista os períodos configurados.

## POST `/api/v1/event-periods`

Cria um período.

## PUT `/api/v1/event-periods/:id`

Atualiza um período.


# 12. Indicadores

## GET `/api/v1/indicators`

Retorna indicadores administrativos.

Exemplo:

```json
{
  "total_projects": 50,
  "projects_in_evaluation": 20,
  "projects_evaluated": 25,
  "pending_evaluations": 10
}
```

---

# 13. Banco de dados

A estrutura inicial deverá contemplar:

### users


id
name
email
password_hash
role
status
created_at
updated_at


### areas


id
name
status
created_at
updated_at


### criterio


id
name
description
status
created_at
updated_at


### event_periods

id
name
type
start_at
end_at
status
created_at
updated_at


### projects


id
title
area_id
responsible_professor_id
summary
objectives
methodology
status
created_at
updated_at


### project_members


id
project_id
name
created_at


Os integrantes não serão usuários autenticados do sistema.

### evaluations


id
project_id
evaluator_id
scores
comment
created_at
updated_at


O campo `scores` será armazenado como JSONB no PostgreSQL.



# 14. Camadas do backend

A aplicação deverá ser organizada em camadas:


Routes
  ↓
Controllers
  ↓
Services
  ↓
Repositories
  ↓
PostgreSQL


# 15. Middlewares

Deverão existir mecanismos para:

- autenticação;
- autorização;
- validação de dados;
- verificação do professor responsável;
- verificação do período de inscrição;
- verificação do período de avaliação;
- bloqueio de avaliação de projeto orientado pelo professor.


# 16. Validações

A API deverá validar:

- campos obrigatórios;
- formato dos dados;
- existência de áreas;
- existência de professores;
- quantidade de integrantes;
- notas entre 0 e 10;
- período aberto;
- permissões;
- avaliação duplicada;
- conflito entre avaliador e orientador.



# 17. Documentação

A API deverá possuir documentação utilizando OpenAPI/Swagger.

A documentação deverá descrever:

- endpoints;
- métodos HTTP;
- parâmetros;
- autenticação;
- request body;
- respostas;
- códigos de erro;
- schemas.