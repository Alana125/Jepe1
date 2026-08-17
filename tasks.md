# Backlog SDD — Plano de Tarefas (8 sessões)

As tasks abaixo seguem Spec Driven Development: pequenas, unívocas, dependência lógica e rastreáveis. Cada tarefa inclui referência a requisitos funcionais (RF) e, quando aplicável, regras de negócio (RB).

## Sessão 1 — Usuários, autenticação e estrutura inicial de evento

Banco de Dados
- [ ] Criar tabela `users` (id, name, email unique, role, password_hash, created_at, updated_at) e migration. -> RF-8, RF-10
- [ ] Criar tabela `areas` (id, name, active, created_at) e migration; inserir valores iniciais sugeridos para JEPE. -> RF-7
- [ ] Criar tabela `criteria` (id, name, active, created_at) e migration; inserir valores iniciais sugeridos para JEPE. -> RF-7
- [ ] Criar tabela `event_periods` (id, phase, start_date, end_date, active, created_at) e migration. -> RF-7

Backend
- [ ] Inicializar Express e criar arquivo de bootstrap `src/app.js` (instância do app) -> RNF-3
- [ ] Implementar módulo de conexão com PostgreSQL (`src/db/pool.js`) usando variáveis de ambiente -> RNF-2
- [ ] Implementar model/repository `User` com métodos `findByEmail()`, `findById()` e `create()` -> RF-8, RF-10

Frontend
- [ ] Inicializar Vite + React e criar layout base (Header, Router, páginas públicas e autenticadas) -> RNF-4
- [ ] Configurar rotas iniciais: `/`, `/login`, `/projects`, `/admin` (rotas vazias) -> RNF-4
- [ ] Criar componente de layout principal (header + área de conteúdo) com espaço para banners de fase do evento. -> RNF-4

Testes
- [ ] Validar conexão com o banco (teste de integração leve do módulo `db/pool`) -> RNF-2

## Sessão 2 — CRUD inicial de Projeto e estrutura de membros

Banco de Dados
- [ ] Criar tabela `projects` (id, title, summary, objectives, methodology, area_id FK, orientador_id FK, status ENUM default 'Inscrito', created_by FK, created_at, updated_at) e migration. -> RF-1
- [ ] Criar tabela `project_members` (id, project_id FK, user_id FK, is_responsible boolean) e migration com unique constraint em (project_id, user_id). -> RF-1

Backend
- [ ] Implementar repository `Project.create(payload)` que insere `projects` e `project_members` numa transação. -> RF-1; RB01
- [ ] Implementar endpoint POST `/api/v1/projects` com validação de 2–5 integrantes, orientador existente e área ativa. -> RF-1; RB01
- [ ] Implementar endpoint GET `/api/v1/projects/:id` retornando projeto, membros, orientador e status. -> RF-1

Frontend
- [ ] Implementar formulário de criação de projeto com campos de título, área, orientador, resumo, objetivos, metodologia e integrantes; validar cliente para 2–5 integrantes. -> RF-1; RB01
- [ ] Implementar página de detalhe de projeto que consome GET `/api/v1/projects/:id` e mostra responsáveis, orientador, status e avaliações. -> RF-1

Testes
- [ ] Testar fluxo de criação de projeto com cenário válido e inválido (1 e 6 integrantes) e área/orientador inválidos. -> RF-1; RB01

## Sessão 3 — Listagem, filtros e situação de projeto

Banco de Dados
- [ ] Criar índices em `projects.area_id`, `projects.status` e `projects.title` para consultas rápidas. -> RF-3

Backend
- [ ] Implementar endpoint GET `/api/v1/projects` com filtros `area`, `status`, `q`, `page`, `limit`. -> RF-3
- [ ] Implementar lógica de situações de projeto, incluindo `Inscrito`, `Em avaliação`, `Avaliado` e `Classificado`. -> RF-9; RB10

Frontend
- [ ] Implementar lista de projetos com filtros por área, situação e busca por título; exibir nota final quando disponível. -> RF-3

Testes
- [ ] Testar endpoint GET `/api/v1/projects` com filtros combinados (`area`, `status`, `q`). -> RF-3

## Sessão 4 — Avaliações com critérios configuráveis

Banco de Dados
- [ ] Criar tabela `evaluations` com colunas `project_id` FK, `evaluator_id` FK, `scores` JSONB, `comment`, `created_at`, `updated_at`; adicionar constraint única (project_id,evaluator_id). -> RF-4; RB05

Backend
- [ ] Implementar `Evaluation.upsert(projectId, evaluatorId, scores)` que insere ou atualiza avaliação. -> RF-4; RB05
- [ ] Implementar endpoint POST `/api/v1/projects/:id/evaluations` que valida fase de avaliação ativa, avaliador elegível e que não é orientador do projeto. -> RF-4; RB05; RB08
- [ ] Implementar serviço para validar `scores` contra critérios ativos e valores 0–10. -> RF-4

Frontend
- [ ] Implementar formulário de avaliação com campos numéricos para cada critério ativo e campo de comentário; chamar POST `/api/v1/projects/:id/evaluations`. -> RF-4
- [ ] Mostrar ao professor apenas projetos elegíveis para avaliação (não orientados e em fase de avaliação). -> RF-4; RB08

Testes
- [ ] Testar que avaliador não pode avaliar projeto que orienta. -> RF-4; RB08
- [ ] Testar que chamada repetida do mesmo avaliador atualiza a avaliação. -> RF-4; RB05
- [ ] Testar validação de notas fora do intervalo 0–10. -> RF-4

## Sessão 5 — Ranking, classificação e cálculo automático

Banco de Dados
- [ ] Criar índices em `evaluations.project_id` e `evaluations.evaluator_id` para consultas de agregação. -> RF-5

Backend
- [ ] Implementar serviço `RankingService.calculate(area?)` que agrega avaliações e calcula `nota_final` como média simples de todos os critérios e avaliadores, filtrando projetos com >=2 avaliadores diferentes. -> RF-5; RB04; RB07
- [ ] Implementar endpoint GET `/api/v1/ranking` com filtro opcional `area`. -> RF-5
- [ ] Implementar serviço `ProjectStatusService` que atualiza status de projetos conforme fases e quantidade de avaliações. -> RF-9; RB10

Frontend
- [ ] Implementar tela de ranking geral e por área consumindo `/api/v1/ranking`. -> RF-5
- [ ] Indicar visualmente projetos que ainda não têm classificação elegível. -> RF-5

Testes
- [ ] Testar `RankingService.calculate()` com conjuntos de avaliações para validar média e filtro de >=2 avaliadores. -> RF-5; RB04; RB07
- [ ] Testar transição automática de status de projeto. -> RF-9; RB10

## Sessão 6 — Dashboard e administração de configuração

Banco de Dados
- [ ] Criar consultas agregadas para total por área, total por situação, média geral e avaliações pendentes. -> RF-6

Backend
- [ ] Implementar endpoint GET `/api/v1/indicators` que retorna os indicadores do dashboard. -> RF-6
- [ ] Implementar endpoints administrativos para gerenciar `areas`, `criteria`, `event_periods` e `users`. -> RF-7; RF-10

Frontend
- [ ] Implementar dashboard com cartões e gráficos de indicadores; cada cartão deve filtrar a lista de projetos correspondente. -> RF-6
- [ ] Implementar páginas administrativas de áreas, critérios e períodos com criação e edição. -> RF-7
- [ ] Implementar página de gerenciamento de usuários para perfis e status. -> RF-10

Testes
- [ ] Testar endpoint GET `/api/v1/indicators` com dados de exemplo. -> RF-6
- [ ] Testar endpoints administrativos de criação/edição de áreas, critérios e períodos. -> RF-7

## Sessão 7 — Permissões e políticas de negócio

Banco de Dados
- [ ] Garantir coluna `role` em `users` e índices relevantes. -> RF-8

Backend
- [ ] Implementar middleware `auth` para proteger rotas e expor `req.user`. -> RF-8
- [ ] Implementar middleware `ensureResponsible()` que verifica se `req.user` é responsável pelo projeto. -> RF-2; RB02
- [ ] Implementar middleware `ensureEvaluationPhaseOpen()` que verifica período de avaliação ativo. -> RF-4; RB06
- [ ] Implementar middleware `ensureNotOrientador()` que impede professor de avaliar projeto orientador. -> RF-4; RB08
- [ ] Implementar middleware `ensureSubmissionPhaseOpen()` para bloquear edição de projeto após encerramento da inscrição. -> RF-2; RB03

Frontend
- [ ] Ocultar ações de editar projeto e editar avaliação quando o usuário não tiver permissão. -> RF-2; RF-4
- [ ] Exibir banners de fase do evento nas telas para orientar usuários. -> RF-7

Testes
- [ ] Testar middlewares de permissão (`ensureResponsible`, `ensureEvaluationPhaseOpen`, `ensureNotOrientador`, `ensureSubmissionPhaseOpen`). -> RF-2; RF-4; RB02; RB03; RB06; RB08

## Sessão 8 — Testes de integração e polimento final

Banco de Dados
- [ ] Executar migrations finais e criar índices de produção. -> RNF-2

Backend
- [ ] Implementar sanitização de entrada e validação centralizada com schema validation. -> RNF-1
- [ ] Documentar rotas críticas em OpenAPI: projetos, avaliações, ranking, indicadores, administração. -> RNF-4

Frontend
- [ ] Implementar tratamento centralizado de erros e mensagens de validação na UI. -> RNF-4

Testes
- [ ] Implementar suíte de testes automatizados que cobre RB01..RB10 (um teste representativo por RB). -> RB01; RB02; RB03; RB04; RB05; RB06; RB07; RB08; RB09; RB10

---

Observações
- As áreas e critérios são configuráveis pelo administrador em tabelas `areas` e `criteria`.
- Os períodos de inscrição e avaliação são configuráveis via `event_periods` e usados pelo backend para habilitar ou bloquear ações.
- As avaliações são armazenadas em `evaluations.scores` como JSONB para suportar critérios dinâmicos.
- A classificação final é publicada pela organização quando o status `Classificado` for liberado.
- A arquitetura permanece em React/Vite, Node/Express e PostgreSQL; as alterações são expansões de configuração, não mudança de stack.
