# REQUISITOS FUNCIONAIS — SISTEMA JEPE

## 1. Autenticação e acesso

### RF01 — Autenticação
O sistema deverá permitir que professores e administradores realizem login utilizando suas credenciais.

### RF02 — Controle de acesso
O sistema deverá controlar as funcionalidades disponíveis de acordo com o perfil do usuário autenticado.

### RF03 — Sessão
O sistema deverá manter a identificação do usuário autenticado durante a utilização do sistema.

---

# 2. Gerenciamento de projetos

### RF04 — Cadastro de projeto
O professor responsável deverá poder cadastrar um projeto contendo:

- título;
- área;
- professor responsável/orientador;
- integrantes;
- resumo;
- objetivos;
- metodologia.

### RF05 — Integrantes
O sistema deverá permitir cadastrar entre 2 e 5 integrantes em um projeto.

Os integrantes não precisarão possuir conta de usuário no sistema.

### RF06 — Edição de projeto
O professor responsável poderá editar os dados do projeto enquanto a etapa de inscrição estiver aberta.

### RF07 — Visualização de projetos
O sistema deverá permitir visualizar os projetos cadastrados.

### RF08 — Listagem e filtros
O sistema deverá permitir consultar projetos e utilizar filtros relacionados aos dados cadastrados, como área e situação.

---

# 3. Status

### RF09 — Controle de status
O sistema deverá controlar os seguintes estados:

**Inscrito → Em avaliação → Avaliado → Classificado**

### RF10 — Bloqueio após período
Após o encerramento do período definido pelo administrador, os dados do projeto deverão ficar disponíveis somente para consulta, conforme as permissões do usuário.

---

# 4. Avaliações

### RF11 — Cadastro de avaliação
O professor avaliador deverá poder registrar uma avaliação para um projeto disponível.

A avaliação deverá conter:

- projeto;
- avaliador;
- data;
- critérios;
- notas;
- comentário.

### RF12 — Notas
Cada critério deverá permitir uma nota de **0 a 10**.

### RF13 — Avaliação única
Um professor poderá realizar somente uma avaliação por projeto.

### RF14 — Edição da avaliação
O professor poderá editar sua própria avaliação enquanto o período de avaliação estiver aberto.

### RF15 — Bloqueio de conflito
O sistema deverá impedir que um professor avalie um projeto no qual esteja cadastrado como professor responsável/orientador.

### RF16 — Média final
O sistema deverá calcular automaticamente a média simples das notas atribuídas pelos avaliadores aos critérios configurados.

A média será calculada a partir das avaliações válidas do projeto.

### RF17 — Mínimo de avaliações
Um projeto deverá possuir pelo menos duas avaliações realizadas por professores diferentes para ser considerado no processo de resultados.

---

# 5. Resultados

### RF18 — Consulta de resultados
O sistema deverá disponibilizar uma área de **Resultados** para consulta dos projetos avaliados.

### RF19 — Notas e médias
A área de Resultados deverá apresentar as notas e médias finais calculadas para os projetos.

### RF20 — Classificação
O sistema deverá apresentar a classificação/situação final dos projetos de acordo com as regras definidas para a JEPE.

---

# 6. Administração

### RF21 — Gerenciamento de professores
O administrador poderá consultar e gerenciar os professores cadastrados.

### RF22 — Gerenciamento de áreas
O administrador poderá cadastrar, editar, ativar e desativar áreas.

### RF23 — Gerenciamento de critérios
O administrador poderá cadastrar e configurar os critérios utilizados nas avaliações.

### RF24 — Gerenciamento de períodos
O administrador poderá configurar os períodos relacionados à inscrição e avaliação.

### RF25 — Resultados administrativos
O administrador poderá consultar os resultados consolidados dos projetos.

### RF26 — Indicadores
O sistema deverá disponibilizar indicadores administrativos relacionados aos projetos e avaliações.

---

# 7. Regras de negócio

### RB01
Somente usuários autorizados poderão acessar as funcionalidades protegidas.

### RB02
Todo projeto deverá possuir um professor responsável/orientador.

### RB03
O projeto poderá ser alterado somente enquanto o período de inscrição estiver aberto.

### RB04
Um projeto deverá possuir pelo menos duas avaliações de professores diferentes para participar da consolidação dos resultados.

### RB05
Um professor poderá avaliar determinado projeto apenas uma vez.

### RB06
A avaliação poderá ser editada enquanto o período de avaliação estiver aberto.

### RB07
A média final será calculada pela média simples das notas das avaliações válidas.

### RB08
O professor não poderá avaliar projeto no qual esteja registrado como orientador/responsável.

### RB09
O professor não poderá avaliar o próprio projeto.

### RB10
As permissões deverão respeitar o perfil do usuário.

### RB11
O fluxo de status deverá seguir:

**Inscrito → Em avaliação → Avaliado → Classificado**

### RB12
As áreas e critérios deverão ser configuráveis pelo administrador.

### RB13
As notas dos critérios deverão utilizar escala de 0 a 10.