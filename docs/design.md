## SPEC DE DESIGN — JEPE
## Jornada de Ensino, Pesquisa e Extensão
## Objetivo do Design

Definir a identidade visual, estrutura de navegação, layouts, componentes, estados e padrões de interação da interface do sistema JEPE.

O design deverá priorizar:

Clareza;
Organização;
Hierarquia visual;
Consistência;
Facilidade de navegação;
Aparência institucional e moderna.

##  Identidade Visual
2.1 Paleta de cores
Token	Hex	Uso
Primary Navy	#12355B	Cabeçalhos, títulos e elementos institucionais
Secondary Purple	#5B3FA3	Ações principais e destaques
Accent Blue	#4EA5D9	Informações e elementos secundários
Success Green	#36A269	Estados positivos
Highlight Yellow	#F2C14E	Atenção e destaques
Background	#F7F9FC	Fundo da aplicação
Text	#17202A	Texto principal
2.2 Tipografia

Utilizar fonte sem serifa.

Elemento	Tamanho	Peso
H1	32px	700
H2	24px	700
H3	20px	600
Texto	16px	400
Texto secundário	14px	400
## Estrutura Geral da Interface

A aplicação utilizará uma estrutura composta por:

┌──────────────────────────────────────────────────────┐
│                       NAVBAR                         │
├───────────────┬──────────────────────────────────────┤
│               │                                      │
│   SIDEBAR     │          CONTEÚDO PRINCIPAL          │
│               │                                      │
│               │                                      │
└───────────────┴──────────────────────────────────────┘
Navbar

Deverá conter:

Logo JEPE;
Nome do usuário;
Identificação do perfil;
Notificações;
Menu de usuário.
Sidebar

A Sidebar será adaptada ao perfil de acesso e manterá o mesmo padrão visual em todas as áreas.

##  Navegação
Aluno
Dashboard
Meu Projeto
Documentos
Resultados
Perfil
Professor Orientador
Dashboard
Meus Projetos
Novo Projeto
Avaliações
Resultados
Perfil
Professor Avaliador
Dashboard
Projetos para Avaliar
Avaliações Parciais
Avaliações Finais
Histórico
Perfil
Administrador
Dashboard
Projetos
Avaliações
Ranking
Áreas
Critérios
Períodos
Usuários

## Login

Tela centralizada contendo:

Logo JEPE;
Campo de e-mail;
Campo de senha;
Botão de entrada;
Mensagens de validação.
                 JEPE


        Jornada de Ensino,
        Pesquisa e Extensão


        E-mail
        [________________]


        Senha
        [________________]


             [ ENTRAR ]
## Dashboard

O Dashboard deverá utilizar cards de indicadores, listas resumidas e blocos de informação.

Estrutura:

Título da página
Descrição curta


┌──────────┐ ┌──────────┐ ┌──────────┐
│ Indicador│ │ Indicador│ │ Indicador│
└──────────┘ └──────────┘ └──────────┘


Conteúdo principal


┌──────────────────────┐ ┌─────────────┐
│                      │ │             │
│      Informações     │ │  Atividade  │
│                      │ │             │
└──────────────────────┘ └─────────────┘

Os indicadores apresentados deverão variar conforme o perfil.

##  Projetos

A listagem de projetos utilizará:

Barra de pesquisa;
Filtros;
Cards ou tabela;
Status visuais;
Ações contextuais.
Project Card
┌──────────────────────────────────────────┐
│ Título do Projeto                        │
│ Área                                     │
│ Orientador                               │
│                                          │
│ Status                    [Em avaliação] │
│                                          │
│                         [Ver projeto →]  │
└──────────────────────────────────────────┘
## Tela de Projeto

A página de detalhes deverá utilizar uma hierarquia organizada em seções:

Título do projeto
Área • Status


────────────────────────────────────────


Informações gerais


Resumo
Objetivos
Metodologia


────────────────────────────────────────


Orientador e integrantes


────────────────────────────────────────


Avaliações


────────────────────────────────────────


Resultado

As informações deverão ser agrupadas visualmente para facilitar a leitura.

##  Cadastro de Projeto

O formulário deverá ser dividido em blocos.

Informações do projeto
Título;
Área;
Resumo;
Objetivos;
Metodologia.
Integrantes

Utilizar componente de seleção/pesquisa de usuários.

Ações
[ Cancelar ]       [ Salvar ]

Quando houver uma ação de envio:

[ Salvar ]       [ Enviar ]
## Avaliações

A interface de avaliação deverá separar visualmente as duas etapas:

┌──────────────────────────────────────────┐
│ AVALIAÇÃO PARCIAL                        │
│                                          │
│ Projeto                                  │
│ Orientador                               │
│ Avaliador                                │
└──────────────────────────────────────────┘

e

┌──────────────────────────────────────────┐
│ AVALIAÇÃO FINAL                          │
│                                          │
│ Projeto                                  │
│ Orientador                               │
│ Avaliador                                │
└──────────────────────────────────────────┘
Formulário de avaliação

Cada critério será apresentado em um bloco:

Relevância


0  1  2  3  4  5  6  7  8  9  10


Comentário
[___________________________________]

O componente deverá facilitar a seleção da nota sem sobrecarregar a tela.

##  Banca Avaliadora

A banca será apresentada através de cards individuais:

┌──────────────────────────────────────┐
│ Prof. Maria Silva                    │
│ Avaliador                             │
│                                      │
│ Parcial       ✓ Concluída            │
│ Final         ○ Pendente              │
└──────────────────────────────────────┘

Os estados deverão ser visualmente distintos.

 ## Resultados e Ranking
Resultado

Utilizar cards de destaque:

┌────────────────────┐
│ NOTA FINAL         │
│                    │
│       8,7          │
└────────────────────┘
Ranking

Utilizar tabela:

Posição	Projeto	Área	Nota
1º	Projeto A	Tecnologia	9,4
2º	Projeto B	Saúde	9,1
3º	Projeto C	Meio Ambiente	8,9


##  Área do Aluno

A área do aluno terá uma interface mais simples e enxuta, mantendo apenas as telas necessárias à sua experiência.

## Dashboard

Apresentar:

Card do projeto;
Status;
Orientador;
Documentos pendentes;
Atalho para o projeto.
Meu Projeto

Utilizar layout de visualização com:

Título;
Área;
Orientador;
Integrantes;
Resumo;
Objetivos;
Metodologia;
Status.
Documentos

Utilizar cards:

┌──────────────────────────────────────┐
│ Termo de Participação                │
│                                      │
│ Pendente de assinatura               │
│                                      │
│ [Visualizar]       [Assinar]         │
└──────────────────────────────────────┘
## Assinatura

Utilizar modal de confirmação:

┌──────────────────────────────────────┐
│ Assinar documento                    │
│                                      │
│ Termo de Participação                │
│                                      │
│ ☐ Confirmar assinatura               │
│                                      │
│ [Cancelar]       [Assinar]           │
└──────────────────────────────────────┘
## Resultados

Utilizar cards de resultado:

┌─────────────────────────────┐
│ Nota final                  │
│                             │
│          8,7                │
│                             │
│ Classificação: 3º lugar     │
└─────────────────────────────┘
## Administração

A área administrativa utilizará tabelas e formulários.

Tabelas
Cabeçalho destacado;
Linhas com espaçamento adequado;
Status em badges;
Ações agrupadas na última coluna.

Exemplo:

┌──────────────┬────────────┬──────────┬────────┐
│ Nome         │ Perfil     │ Status   │ Ações  │
├──────────────┼────────────┼──────────┼────────┤
│ João Silva   │ Professor  │ Ativo    │ Editar │
│ Ana Souza    │ Aluno      │ Ativo    │ Editar │
└──────────────┴────────────┴──────────┴────────┘
## Componentes

A interface deverá utilizar componentes reutilizáveis:

Navbar
Sidebar
Button
Input
Select
Card
ProjectCard
StatusBadge
IndicatorCard
SearchBar
Filter
Modal
Toast
EvaluationForm
EvaluationCard
EvaluatorCard
Timeline
RankingTable
AdminTable
DocumentCard
DocumentViewer
SignatureModal



## Cards

Padrão:

Fundo branco;
Bordas discretas;
Cantos arredondados;
Sombra leve;
Espaçamento interno consistente;
Hierarquia clara entre título e conteúdo.

## Formulários

Os formulários deverão seguir:

Labels acima dos campos;
Campos com altura consistente;
Mensagens de erro abaixo do campo;
Agrupamento por seção;
Botões alinhados ao final do formulário;
Espaçamento vertical uniforme.


## Modais

Os modais serão utilizados para:

Confirmações;
Assinaturas;
Exclusões;
Visualização rápida;
Alertas importantes.

Estrutura:

┌──────────────────────────────────────┐
│ Título                               │
│                                      │
│ Conteúdo                             │
│                                      │
│ [Cancelar]          [Confirmar]      │
└──────────────────────────────────────┘
## Timeline

Para representar visualmente as etapas do projeto:

● Inscrição
│
● Projeto enviado
│
● Avaliação parcial
│
○ Avaliação final
│
○ Resultado

Estados:

Concluído;
Atual;
Próximo;
Indisponível.

## Phase Banner

Utilizar um banner informativo para destacar a etapa atual:

┌──────────────────────────────────────────────┐
│ FASE ATUAL                                   │
│ Avaliação Parcial                            │
└──────────────────────────────────────────────┘
## Acessibilidade

O design deverá garantir:

Contraste adequado;
Foco visível;
Hierarquia tipográfica;
Labels nos campos;
Ícones acompanhados de texto quando necessário;
Não utilização exclusiva de cores para transmitir informações;
Navegação consistente.


## Layout

A aplicação será projetada para notebooks, utilizando:

Sidebar fixa;
Conteúdo centralizado;
Grid responsivo dentro da área disponível;
Tabelas sem rolagem horizontal sempre que possível;
Espaçamento consistente;
Aproveitamento adequado da área horizontal.

## Princípios de Design

O JEPE deverá seguir cinco princípios:

Clareza
Informações importantes devem ser facilmente identificadas.

Hierarquia
Títulos, informações e ações devem possuir níveis visuais distintos.

Consistência
Componentes semelhantes devem possuir o mesmo comportamento e aparência.

Simplicidade
Cada tela deverá apresentar apenas as informações necessárias para aquela etapa.

Contexto
O usuário deverá compreender facilmente onde está, qual etapa está visualizando e quais ações estão disponíveis.