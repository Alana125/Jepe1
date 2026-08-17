Projeto: Sistema JEPE — Jornada de Ensino, Pesquisa e Extensão do IFAL

Contexto
O IFAL realiza a Jornada de Ensino, Pesquisa e Extensão (JEPE), evento destinado à apresentação e avaliação de projetos desenvolvidos pelos estudantes, promovendo a integração entre ensino, pesquisa, extensão, inovação e comunidade acadêmica.

Problema
O processo de inscrição dos projetos, organização das avaliações e registro das notas pode ser realizado manualmente ou de forma descentralizada, dificultando o acompanhamento das propostas, aumentando o risco de perda de informações e tornando mais trabalhoso o processo de consolidação das avaliações e classificação.

Atores

Aluno
- Inscreve projeto.
- Cadastra os integrantes.
- Acompanha o projeto.
- Edita apenas o projeto pelo qual é responsável.
- Consulta avaliações e nota final quando disponibilizadas.

Professor Avaliador
- Visualiza projetos disponíveis para avaliação.
- Avalia projetos.
- Registra notas e comentários.
- Edita sua própria avaliação enquanto a fase estiver aberta.
- Não pode avaliar projeto no qual atua como orientador.

Administrador/Organização
- Gerencia usuários.
- Gerencia inscrições.
- Define períodos de inscrição e avaliação.
- Gerencia áreas e critérios.
- Organiza e acompanha avaliações.
- Consulta resultados.
- Acompanha indicadores.
- Visualiza rankings.

Entidades principais

- Usuário
- Projeto
- Integrante
- Avaliação
- Área
- Critério
- Período de evento

Funcionalidades

- Autenticação e controle de acesso por perfil.
- Inscrição de projetos.
- Cadastro de integrantes.
- Cadastro de orientador.
- Listagem de projetos.
- Filtro por área e situação.
- Visualização de projeto.
- Registro de avaliações.
- Edição de avaliação enquanto a fase estiver aberta.
- Ranking geral.
- Ranking por área.
- Cálculo automático da nota final.
- Dashboard com indicadores.
- Gerenciamento administrativo de áreas, critérios e períodos.

Regras de negócio

RB01. Cada projeto possui entre 2 e 5 integrantes.
RB02. Apenas o responsável pela inscrição pode editar o projeto.
RB03. Após o encerramento do período de inscrições, os projetos ficam somente leitura.
RB04. Cada projeto precisa de pelo menos duas avaliações realizadas por professores diferentes para aparecer no ranking.
RB05. Um professor pode avaliar um determinado projeto apenas uma vez.
RB06. O professor pode editar sua avaliação enquanto a fase de avaliação estiver aberta.
RB07. A nota final é calculada pela média simples das notas atribuídas em todos os critérios por todos os avaliadores.
RB08. Um professor não pode avaliar um projeto no qual esteja cadastrado como orientador.
RB09. O sistema deve respeitar as permissões de cada perfil.
RB10. A situação do projeto deve acompanhar o fluxo do evento: Inscrito → Em avaliação → Avaliado → Classificado.

Áreas
As áreas devem ser mantidas de forma configurável pelo administrador, pois a divisão oficial pode variar conforme a edição da JEPE.
Como valores iniciais, considerar:
- Ciências da Natureza
- Ciências Exatas
- Ciências Humanas
- Tecnologia
- Meio Ambiente
- Linguagens

Critérios
Os critérios também devem ser configuráveis pelo administrador.
Como valores iniciais, considerar:
- Relevância
- Originalidade/Inovação
- Rigor científico
- Metodologia
- Qualidade da apresentação
- Aplicabilidade/Impacto
- Contribuição para ensino, pesquisa ou extensão
Cada critério deve permitir notas de 0 a 10.

Situações
- Inscrito
- Em avaliação
- Avaliado
- Classificado

Fora do escopo

- Upload de arquivos.
- Certificados.
- Votação do público.
- Controle de presença.
- Inscrição de visitantes.
- Organização de salas/estandes.
- Submissão de artigos completos.
- Cronograma completo do evento.

Formulário de Projeto

- Título
- Área
- Responsável
- Integrantes
- Orientador
- Resumo
- Objetivos
- Metodologia

Formulário de Avaliação

- Projeto
- Avaliador
- Data
- Critérios configurados
- Notas de 0 a 10
- Comentário

Dashboard
Deve apresentar:
- Total de projetos.
- Projetos por área.
- Projetos por situação.
- Total de avaliações.
- Avaliações pendentes.
- Média geral.
- Quantidade de avaliadores.
- Ranking geral.
- Ranking por área.

Observação
Os períodos de inscrição e avaliação devem ser configuráveis pelo administrador, em vez de serem fixos no código. O sistema deve manter a estrutura para configuração de fases e prazos da JEPE sem inventar regras adicionais fora do edital oficial.