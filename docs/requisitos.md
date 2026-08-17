# Requisitos do Sistema — JEPE (Jornada de Ensino, Pesquisa e Extensão)

## Objetivo do sistema

Digitalizar e organizar o processo de inscrição, avaliação e classificação dos projetos da JEPE, garantindo rastreabilidade, integridade das avaliações e um painel de indicadores para a coordenação do IFAL.

## Escopo

* Inscrição de projetos pelo Professor Orientador.
* Cadastro de professor orientador responsável por cada projeto.
* Cadastro de 2 a 5 integrantes pelo Professor Orientador.
* Edição do projeto apenas pelo Professor Orientador responsável enquanto o período de inscrição estiver aberto.
* Envio do projeto exclusivamente pelo Professor Orientador responsável.
* Registro e edição de avaliações por professores avaliadores enquanto a fase de avaliação estiver aberta.
* Impedimento de avaliação de projetos pelo próprio professor orientador.
* Listagem de projetos com filtros por área e situação.
* Cálculo de ranking por área e geral com regras definidas.
* Dashboard de indicadores com métricas de projetos, avaliações e classificações.
* Gerenciamento administrativo de áreas, critérios e períodos de evento.

Itens fora do escopo: upload de arquivos, certificados, votação do público, controle de presença, inscrição de visitantes, organização de salas/estandes, submissão de artigos completos, cronograma completo do evento.

## Atores

* Aluno
* Professor Orientador
* Professor Avaliador
* Administrador / Organização

Observação: Professor Orientador e Professor Avaliador são funções exercidas por usuários com perfil de Professor. Um professor pode atuar como orientador em determinados projetos e como avaliador em outros, desde que não avalie um projeto no qual seja orientador.

O Professor Orientador é o responsável pelo cadastro, gerenciamento e envio do projeto. O aluno participa como integrante do projeto e não possui permissão para criar, editar ou enviar projetos.

## Regras de Negócio (RB)

RB01. Cada projeto possui entre 2 e 5 integrantes.

RB02. Apenas o Professor Orientador responsável pelo projeto pode editar o projeto.

RB03. Após o encerramento do período de inscrições, os projetos ficam somente leitura.

RB04. Cada projeto precisa de pelo menos duas avaliações realizadas por professores diferentes para aparecer no ranking.

RB05. Um professor pode avaliar um determinado projeto apenas uma vez.

RB06. O professor avaliador pode editar sua avaliação enquanto a fase de avaliação estiver aberta.

RB07. A nota final é calculada pela média simples das notas atribuídas em todos os critérios por todos os avaliadores.

RB08. Um professor não pode avaliar um projeto no qual esteja cadastrado como orientador.

RB09. O sistema deve respeitar as permissões de cada perfil.

RB10. A situação do projeto deve acompanhar o fluxo do evento: Inscrito → Em avaliação → Avaliado → Classificado.

RB11. O professor orientador deve ser um usuário cadastrado com perfil de Professor.

RB12. Cada projeto deve possuir um professor orientador cadastrado.

RB13. O professor orientador pode visualizar, editar e enviar o projeto que orienta, respeitando o período de inscrição, mas não pode avaliá-lo.

RB14. Um professor pode atuar como orientador e avaliador em projetos diferentes, desde que não avalie um projeto no qual esteja cadastrado como orientador.

RB15. Apenas o Professor Orientador vinculado ao projeto pode realizar seu cadastro, edição e envio.

RB16. Os alunos cadastrados no projeto possuem a função de integrantes e não podem alterar ou enviar o projeto.

## Configurações iniciais e administráveis

* Áreas: configuráveis pelo administrador. Valores iniciais sugeridos:

  * Ciências da Natureza
  * Ciências Exatas
  * Ciências Humanas
  * Tecnologia
  * Meio Ambiente
  * Linguagens

* Critérios: configuráveis pelo administrador. Valores iniciais sugeridos:

  * Relevância
  * Originalidade/Inovação
  * Rigor científico
  * Metodologia
  * Qualidade da apresentação
  * Aplicabilidade/Impacto
  * Contribuição para ensino, pesquisa ou extensão

* Situações de projeto:

  * Inscrito
  * Em avaliação
  * Avaliado
  * Classificado

* Períodos de evento: inscrição e avaliação devem ser mantidos em configuração administrativa, pois a edição oficial da JEPE pode variar.

## Requisitos Funcionais (RF)

RF-1: O sistema deve permitir que um Professor Orientador crie um projeto informando título, área, resumo, objetivos, metodologia e entre 2 e 5 integrantes, incluindo os alunos participantes.

* Rastreado por: RB01, RB02, RB11, RB12, RB15, RB16

RF-2: O sistema deve permitir que o Professor Orientador responsável edite os dados do projeto enquanto o período de inscrição estiver aberto.

* Rastreado por: RB02, RB03, RB15

RF-3: O sistema deve listar projetos e permitir filtragem por área, situação e busca por título.

* Rastreado por: RB04, RB10

RF-4: Professores avaliadores devem poder registrar e editar avaliações com notas de 0 a 10 para cada critério configurado e comentário, apenas uma avaliação por projeto por professor.

* Rastreado por: RB05, RB06, RB07, RB08

RF-5: O sistema deve calcular e exibir ranking geral e ranking por área, considerando apenas projetos com ao menos duas avaliações diferentes.

* Rastreado por: RB04, RB07

RF-6: O sistema deve apresentar dashboard com total de projetos, projetos por área, projetos por situação, total de avaliações, avaliações pendentes, média geral, quantidade de avaliadores, ranking geral e ranking por área.

* Rastreado por: RB04, RB07

RF-7: O sistema deve permitir que o administrador gerencie áreas, critérios e períodos de inscrição/avaliação.

* Rastreado por: RB09

RF-8: O sistema deve aplicar controle de permissões, garantindo que cada perfil só acesse ações autorizadas.

* Rastreado por: RB02, RB05, RB06, RB08, RB09, RB13, RB14, RB15, RB16

RF-9: O sistema deve atualizar automaticamente a situação do projeto conforme o fluxo do evento e permitir que o administrador marque a classificação final.

* Rastreado por: RB03, RB04, RB10

RF-10: O sistema deve permitir que o administrador gerencie usuários e acompanhe as inscrições e avaliações.

* Rastreado por: RB09

RF-11: O sistema deve associar automaticamente o Professor Orientador autenticado ao projeto criado por ele.

* Rastreado por: RB11, RB12, RB15

RF-12: O sistema deve permitir que o Professor Orientador visualize os projetos nos quais está cadastrado como orientador.

* Rastreado por: RB13

RF-13: O sistema deve impedir que um professor avalie um projeto no qual esteja cadastrado como orientador.

* Rastreado por: RB08, RB13, RB14

RF-14: O sistema deve permitir que somente o Professor Orientador responsável envie o projeto para inscrição na JEPE.

* Rastreado por: RB15

RF-15: O sistema deve impedir que alunos integrantes editem, criem ou enviem projetos.

* Rastreado por: RB16

## Requisitos Não Funcionais (RNF)

RNF-1: Autenticação e autorização via JWT (stateless), com todas as chamadas protegidas em HTTPS.

RNF-2: Banco de dados PostgreSQL; esquema com auditoria mínima (`created_at`, `updated_at`) para entidades-chave.

RNF-3: Arquitetura em frontend/backend separados, com API REST versionada em `/api/v1`.

RNF-4: Testes automatizados unitários e de integração para as regras de negócio críticas.

RNF-5: A interface administrativa deve permitir a configuração de áreas, critérios e períodos sem alterar o código.

## Histórias de Usuário

* HU-1 (Professor Orientador — Cadastrar projeto): Como Professor Orientador, quero cadastrar um projeto com 2–5 integrantes e área temática para participar da JEPE.

  * Aceitação: RF-1, RB01, RB11, RB12, RB15, campos obrigatórios, projeto criado como `Inscrito`.

* HU-2 (Professor Orientador — Editar projeto): Como Professor Orientador responsável, quero editar o projeto enquanto o prazo de inscrição estiver aberto.

  * Aceitação: RF-2, apenas o Professor Orientador responsável pode editar, bloqueio depois do período.

* HU-3 (Aluno — Consultar projeto): Como aluno integrante, quero consultar as informações e o resultado do projeto do qual participo.

  * Aceitação: acesso somente às informações permitidas, sem permissão para editar ou enviar o projeto.

* HU-4 (Professor Avaliador — Avaliar projeto): Como professor avaliador, quero registrar notas por critério e comentário em um projeto que não oriento.

  * Aceitação: RF-4, RB08, RF-6, RB06.

* HU-5 (Professor Orientador — Gerenciar projeto): Como Professor Orientador, quero visualizar, editar e enviar os projetos que estão sob minha orientação.

  * Aceitação: RF-1, RF-2, RF-12, RF-14, RB02, RB13, RB15.

* HU-6 (Administrador — Configurar evento): Como administrador, quero definir áreas, critérios e períodos para a JEPE, para que a plataforma reflita a edição atual do edital.

  * Aceitação: RF-7, RF-8, RNF-5.

* HU-7 (Administrador — Ver resultados): Como administrador, quero consultar indicadores e rankings para acompanhar a qualidade dos projetos.

  * Aceitação: RF-6, RF-9.

## Critérios de Aceitação (por requisito)

* RF-1: Projeto criado pelo Professor Orientador com área, 2–5 integrantes e status `Inscrito`.
* RF-2: Edição permitida apenas enquanto o período de inscrição estiver aberto e apenas pelo Professor Orientador responsável.
* RF-3: Listagem permite filtro por área e situação e busca por título.
* RF-4: Avaliação salva e atualizada pelo mesmo professor; valores entre 0 e 10; proibição de avaliação de projeto orientado.
* RF-5: Ranking exibe apenas projetos com >=2 avaliações diferentes; ordena por média das notas.
* RF-6: Dashboard exibe os indicadores definidos no escopo.
* RF-7: Área, critério e período podem ser criados ou atualizados pelo administrador.
* RF-8: Cada perfil vê apenas ações autorizadas; professor só pode editar próprias avaliações durante fase aberta; Professor Orientador não pode avaliar projeto que orienta; aluno não pode editar ou enviar projeto.
* RF-9: Situação do projeto transita corretamente e o administrador pode publicar classificação.
* RF-10: Administrador consegue visualizar e gerenciar usuários com papel e status.
* RF-11: O Professor Orientador autenticado é associado automaticamente ao projeto criado.
* RF-12: Professor Orientador consegue visualizar os projetos nos quais está cadastrado como orientador.
* RF-13: O sistema bloqueia a avaliação quando o professor avaliador é o orientador do projeto.
* RF-14: Somente o Professor Orientador responsável consegue enviar o projeto.
* RF-15: Alunos integrantes não possuem permissão para criar, editar ou enviar projetos.

## Casos de Uso (resumidos)

### 1. Cadastrar Projeto

* Ator: Professor Orientador
* Pré-condição: Autenticado como Professor Orientador.
* Fluxo: Acessar novo projeto → preencher formulário → selecionar área → adicionar integrantes → validar integrantes → salvar projeto → projeto criado como `Inscrito`.

### 2. Editar Projeto

* Ator: Professor Orientador
* Pré-condição: Período de inscrição aberto e usuário vinculado como orientador do projeto.
* Fluxo: Abrir projeto próprio → editar campos → salvar.

### 3. Enviar Projeto

* Ator: Professor Orientador
* Pré-condição: Projeto cadastrado, dados obrigatórios preenchidos e período de inscrição aberto.
* Fluxo: Abrir projeto → revisar informações → enviar projeto → validar dados → confirmar envio → projeto permanece com status `Inscrito`.

### 4. Consultar Projeto Orientado

* Ator: Professor Orientador
* Pré-condição: Autenticado como Professor e vinculado como orientador.
* Fluxo: Acessar projetos orientados → selecionar projeto → visualizar informações.

### 5. Avaliar Projeto

* Ator: Professor Avaliador
* Pré-condição: Autenticado como Professor, fase de avaliação aberta e não ser orientador do projeto.
* Fluxo: Selecionar projeto → verificar conflito de interesse → preencher notas por critério → salvar ou atualizar.

### 6. Consultar Avaliação e Nota Final

* Ator: Professor Orientador / Aluno
* Pré-condição: Projeto avaliado.
* Fluxo: Acessar detalhe do projeto → visualizar avaliações e nota final conforme as permissões do perfil.

### 7. Configurar JEPE

* Ator: Administrador
* Pré-condição: Autenticado como Admin.
* Fluxo: Definir áreas, critérios e períodos → salvar configurações.

### 8. Visualizar Ranking

* Ator: Aluno, Professor(Orientador ou avaliador) ou Administrador
* Pré-condição: Pelo menos dois avaliadores registrados.
* Fluxo: Acessar ranking geral ou por área → ordenar por nota final.

## Rastreabilidade/Requisitos ↔ Regras de Negócio

* RB01: RF-1
* RB02: RF-2, RF-8, RF-15
* RB03: RF-2, RF-9
* RB04: RF-3, RF-5, RF-6, RF-9
* RB05: RF-4, RF-8
* RB06: RF-4, RF-8
* RB07: RF-4, RF-5, RF-6
* RB08: RF-4, RF-8, RF-13
* RB09: RF-7, RF-8, RF-10
* RB10: RF-3, RF-9
* RB11: RF-1, RF-11
* RB12: RF-1, RF-11
* RB13: RF-8, RF-12, RF-13
* RB14: RF-8, RF-13
* RB15: RF-1, RF-2, RF-11, RF-14
* RB16: RF-1, RF-8, RF-15

## Observações operacionais

* Áreas e critérios são armazenados em tabelas configuráveis pelo administrador.
* Períodos de inscrição e avaliação são configuráveis e utilizados pelo backend para habilitar ou bloquear ações.
* O Professor Orientador deve ser um usuário cadastrado com perfil `Professor`.
* Um projeto deve possuir um Professor Orientador cadastrado.
* O Professor Orientador autenticado que criar o projeto será automaticamente vinculado como responsável pelo projeto.
* Somente o Professor Orientador responsável poderá criar, editar e enviar o projeto.
* Os alunos cadastrados no projeto possuem a função de integrantes e não podem criar, editar ou enviar o projeto.
* Um professor pode atuar como orientador e avaliador em projetos diferentes.
* O backend deve verificar se o professor avaliador é o orientador do projeto antes de permitir uma avaliação.
* O backend deve verificar se o usuário autenticado é o Professor Orientador responsável antes de permitir operações de criação, edição e envio do projeto.
* Avaliações usam `scores` JSONB para suportar critérios dinâmicos e permitir cálculo de média simples.
* O status `Classificado` deve ser atribuído quando a classificação final estiver liberada pela organização, sem criar regras de pontuação adicionais não definidas pelo edital.
