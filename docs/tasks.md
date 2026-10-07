# TASKS / SDD — SISTEMA JEPE

## 1. Objetivo

Organizar o desenvolvimento do Sistema JEPE em etapas técnicas, contemplando frontend, backend, banco de dados, API, autenticação, regras de negócio, testes e integração.

---

# 2. Stack

### Frontend
- React;
- Vite;
- JavaScript;
- React Router;
- CSS.

### Backend
- Node.js;
- Express;
- REST API.

### Banco
- PostgreSQL;
- migrations;
- JSONB.

### Documentação
- OpenAPI/Swagger.

---

# 3. Arquitetura

```text
React + Vite
      ↓
React Router
      ↓
REST API
      ↓
Node.js + Express
      ↓
Controllers
      ↓
Services
      ↓
Repositories
      ↓
PostgreSQL
```

---

# SPRINT 01 — Banco de dados

## TASK 01 — Configurar PostgreSQL

Criar o banco de dados da aplicação.

**Status:** A fazer

## TASK 02 — Criar tabela users

Implementar usuários com:

- id;
- nome;
- e-mail;
- senha;
- perfil;
- status.

**Relacionamento:** professor/administrador.

## TASK 03 — Criar tabela areas

Campos:

- id;
- nome;
- status.

## TASK 04 — Criar tabela criteria

Campos:

- id;
- nome;
- descrição;
- status.

## TASK 05 — Criar tabela event_periods

Campos:

- id;
- nome;
- tipo;
- início;
- fim;
- status.

## TASK 06 — Criar tabela projects

Campos:

- id;
- título;
- área;
- professor responsável;
- resumo;
- objetivos;
- metodologia;
- status.

## TASK 07 — Criar tabela project_members

Armazenar os integrantes do projeto sem necessidade de conta de usuário.

## TASK 08 — Criar tabela evaluations

Campos:

- id;
- projeto;
- avaliador;
- scores;
- comentário;
- datas.

O campo `scores` deverá utilizar JSONB.

---

# SPRINT 02 — Backend

## TASK 09 — Criar aplicação Express

Configurar:

```text
src/
 ├── app.js
 ├── routes/
 ├── controllers/
 ├── services/
 ├── repositories/
 ├── middlewares/
 ├── validators/
 └── db/
```

## TASK 10 — Configurar conexão PostgreSQL

Criar pool de conexão e configuração por variáveis de ambiente.

## TASK 11 — Criar autenticação

Implementar:

```text
POST /api/v1/auth/login
```

Utilizar JWT.

## TASK 12 — Criar middleware de autenticação

Validar o token enviado nas requisições protegidas.

## TASK 13 — Criar controle de permissões

Separar permissões de:

- PROFESSOR;
- ADMIN.

---

# SPRINT 03 — API de projetos

## TASK 14 — Criar CRUD de projetos

Implementar:

```text
GET    /api/v1/projects
POST   /api/v1/projects
GET    /api/v1/projects/:id
PUT    /api/v1/projects/:id
```

## TASK 15 — Implementar integrantes

Permitir cadastrar de 2 a 5 integrantes.

## TASK 16 — Implementar filtros

Permitir filtrar projetos por:

- área;
- status;
- busca textual.

## TASK 17 — Implementar regras de edição

Bloquear alterações após o encerramento do período de inscrição.

---

# SPRINT 04 — API de avaliações

## TASK 18 — Criar avaliação

Implementar:

```text
GET  /api/v1/projects/:id/evaluations
POST /api/v1/projects/:id/evaluations
PUT  /api/v1/projects/:id/evaluations/:evaluationId
```

## TASK 19 — Validar notas

Aceitar somente notas entre:

```text
0 e 10
```

## TASK 20 — Impedir avaliação duplicada

Um professor não poderá avaliar o mesmo projeto duas vezes.

## TASK 21 — Impedir conflito

Bloquear avaliação quando o professor:

- for responsável/orientador do projeto;
- estiver vinculado ao próprio projeto.

## TASK 22 — Permitir edição

Permitir que o avaliador edite sua própria avaliação durante o período de avaliação.

---

# SPRINT 05 — Resultados

## TASK 23 — Criar cálculo da média

Calcular automaticamente a média simples das avaliações válidas.

## TASK 24 — Criar endpoint de resultados

Implementar:

```text
GET /api/v1/results
```

## TASK 25 — Criar tela de resultados

Apresentar:

- projeto;
- área;
- avaliações;
- média final;
- classificação;
- situação.

## TASK 26 — Remover Ranking

Não implementar:

```text
/ranking
/api/v1/ranking
```

Não criar menu, página, endpoint ou componente específico de Ranking.

---

# SPRINT 06 — Configurações administrativas

## TASK 27 — CRUD de áreas

Implementar:

```text
GET
POST
PUT
PATCH status
```

## TASK 28 — CRUD de critérios

Implementar:

```text
GET
POST
PUT
PATCH status
```

## TASK 29 — CRUD de períodos

Implementar:

```text
GET
POST
PUT
```

## TASK 30 — Gerenciamento de professores

Implementar consulta e gerenciamento dos usuários professores.

---

# SPRINT 07 — Frontend

## TASK 31 — Configurar React/Vite

Criar estrutura inicial do frontend.

## TASK 32 — Configurar React Router

Rotas:

```text
/login
/dashboard
/projetos
/projetos/novo
/projetos/:id
/projetos/:id/editar
/avaliacoes
/avaliacoes/:id
/resultados
/perfil
```

Rotas administrativas:

```text
/professores
/areas
/criterios
/periodos
/indicadores
```

**Não criar `/ranking`.**

## TASK 33 — Criar Login

Integrar com:

```text
POST /api/v1/auth/login
```

## TASK 34 — Criar Dashboard

Integrar indicadores da API.

## TASK 35 — Criar telas de projetos

Implementar:

- lista;
- cadastro;
- detalhes;
- edição.

## TASK 36 — Criar telas de avaliações

Implementar:

- lista;
- formulário;
- detalhes;
- edição.

## TASK 37 — Criar tela de resultados

Integrar:

```text
GET /api/v1/results
```

## TASK 38 — Criar telas administrativas

Implementar:

- professores;
- áreas;
- critérios;
- períodos;
- indicadores.

---

# SPRINT 08 — Integração e qualidade

## TASK 39 — Integrar frontend e API

Conectar todas as telas aos endpoints correspondentes.

## TASK 40 — Tratamento de erros

Implementar tratamento para:

- 400;
- 401;
- 403;
- 404;
- 409;
- 500.

## TASK 41 — Validação de permissões

Verificar todas as regras de acesso no backend.

## TASK 42 — Testes de regras de negócio

Testar:

- RB01 — acesso autorizado;
- RB02 — projeto com responsável;
- RB03 — bloqueio após período;
- RB04 — mínimo de duas avaliações;
- RB05 — avaliação única;
- RB06 — edição durante período;
- RB07 — cálculo da média;
- RB08 — bloqueio de orientador;
- RB09 — bloqueio do próprio projeto;
- RB10 — permissões;
- RB11 — fluxo de status.

## TASK 43 — Documentação OpenAPI

Documentar todos os endpoints da API.

## TASK 44 — Teste de integração

Validar o fluxo completo:

```text
Login
 ↓
Dashboard
 ↓
Cadastro de projeto
 ↓
Listagem
 ↓
Avaliação
 ↓
Cálculo da média
 ↓
Resultados
```

---

# 4. Fluxo técnico final

```text
PROFESSOR
   ↓
LOGIN
   ↓
DASHBOARD
   ↓
PROJETOS
   ↓
CADASTRO / EDIÇÃO
   ↓
AVALIAÇÕES
   ↓
CÁLCULO DAS MÉDIAS
   ↓
RESULTADOS
```

Para administração:

```text
ADMIN
 ↓
DASHBOARD
 ↓
PROFESSORES
ÁREAS
CRITÉRIOS
PERÍODOS
RESULTADOS
INDICADORES
```

---

# 5. Regra importante

O sistema **não terá Ranking**.

A nomenclatura oficial da funcionalidade será:

**RESULTADOS**

Todos os documentos, telas, rotas, endpoints, tarefas e componentes deverão utilizar essa nomenclatura.