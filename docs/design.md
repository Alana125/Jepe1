## Design Document: JEPE — Jornada de Ensino, Pesquisa e Extensão


## Overview

- O JEPE (Jornada de Ensino, Pesquisa e Extensão) será uma aplicação web institucional destinada a organizar o processo de inscrição, acompanhamento, avaliação e classificação de projetos.

- O design deverá definir a identidade visual, estrutura de navegação, layouts, componentes, estados e padrões de interação da aplicação.

** A aplicação deverá atender diferentes perfis de acesso:

- Aluno;
- Professor Orientador;
- Professor Avaliador;
- Administrador.

- Cada perfil terá uma navegação e um conjunto de funcionalidades adequado às suas responsabilidades.

## Architecture
    ** Arquitetura da Interface

- A interface será organizada em uma estrutura composta por Navbar, Sidebar e Área de Conteúdo Principal.

- A estrutura visual principal será composta por Navbar, Sidebar e conteúdo centralizado. A Sidebar será adaptada conforme o perfil de acesso.

## Estrutura de Layout
┌──────────────────────────────────────────────────────┐
│                       NAVBAR                         │
├───────────────┬──────────────────────────────────────┤
│               │                                      │
│   SIDEBAR     │          CONTEÚDO PRINCIPAL          │
│               │                                      │
│               │                                      │
└───────────────┴──────────────────────────────────────┘

A aplicação será projetada prioritariamente para notebooks, utilizando:

- Sidebar fixa;
- Conteúdo centralizado;
- Grid responsivo;
- Espaçamento consistente;
- Aproveitamento adequado da área horizontal;
- Tabelas sem rolagem horizontal sempre que possível.
- Decisões Arquiteturais
- Decisão	Justificativa
- Utilizar Navbar + Sidebar + Conteúdo Principal	Mantém a navegação organizada e permite separar ações globais das funcionalidades de cada perfil.
- Sidebar adaptada por perfil	Cada usuário visualiza somente a navegação relacionada às suas responsabilidades.
- Utilizar componentes reutilizáveis	Evita duplicação e garante consistência visual entre as telas.
- Utilizar cards para informações resumidas	Facilita a visualização de indicadores, projetos, documentos e resultados.
- Utilizar tabelas para administração e ranking	Essas informações possuem estrutura tabular e exigem comparação entre vários registros.
- Utilizar Timeline para etapas do projeto	Permite representar visualmente o progresso da inscrição até o resultado.
- Utilizar Phase Banner	Torna explícita a etapa atual do processo.
- Utilizar modais para ações críticas	Evita que confirmações, assinaturas e exclusões sejam realizadas acidentalmente.
- Utilizar badges de status	Permite identificar rapidamente estados como ativo, pendente e concluído.
- Utilizar fonte sem serifa	Mantém a interface moderna e facilita a leitura.

## Critérios para revisão das decisões

As decisões deverão ser revistas caso:

- A quantidade de perfis aumente significativamente;
- A aplicação passe a atender principalmente dispositivos móveis;
- A quantidade de itens da Sidebar prejudique a navegação;
- Novos fluxos exijam uma estrutura diferente;
- Os componentes reutilizáveis deixem de atender às necessidades das telas.
- Components and Interfaces
- Navbar

- Localização: componente global da aplicação.

## Responsabilidade:

- Exibir logo JEPE;
- Exibir nome do usuário;
- Exibir identificação do perfil;
- Exibir notificações;
- Disponibilizar menu do usuário.

## Interface conceitual:

interface NavbarProps {
  userName: string;
  profileName: string;
  notificationCount?: number;
}
Sidebar

## Responsabilidade:

Controlar a navegação principal conforme o perfil autenticado.

type UserRole =
  | "ALUNO"
  | "PROFESSOR_ORIENTADOR"
  | "PROFESSOR_AVALIADOR"
  | "ADMINISTRADOR";


interface SidebarProps {
  role: UserRole;
}

O conteúdo da Sidebar deverá variar de acordo com o perfil.

## Button

- Componente reutilizável para ações da interface.

interface ButtonProps {
  label: string;
  type?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  onClick: () => void;
}

Exemplos de utilização:

Entrar;
Salvar;
Enviar;
Cancelar;
Assinar;
Editar.
Input

- Campo reutilizável para entrada de informações.

interface InputProps {
  label: string;
  value: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  onChange: (value: string) => void;
}

- Os formulários deverão utilizar labels acima dos campos e mensagens de erro abaixo do campo.

## ProjectCard

Responsável por apresentar um projeto de maneira resumida.

interface ProjectCardProps {
  title: string;
  area: string;
  advisor: string;
  status: ProjectStatus;
  onView: () => void;
}

Informações apresentadas:

Título;
Área;
Orientador;
Status;
Ação para visualizar o projeto.
StatusBadge
type ProjectStatus =
  | "PENDENTE"
  | "EM_AVALIACAO"
  | "CONCLUIDO"
  | "APROVADO"
  | "REPROVADO";

- O componente deverá utilizar elementos visuais distintos para representar estados, sem depender exclusivamente de cores. Isso também atende ao requisito de acessibilidade da SPEC.

 ## EvaluationForm

- Responsável pelo preenchimento das avaliações.

interface EvaluationCriterion {
  id: string;
  name: string;
  score: number;
  comment?: string;
}


interface EvaluationFormProps {
  criteria: EvaluationCriterion[];
  onSubmit: (criteria: EvaluationCriterion[]) => void;
}

- Cada critério deverá apresentar uma escala de 0 a 10 e campo para comentário.

## EvaluationCard

- Apresenta informações resumidas de uma avaliação.

interface EvaluationCardProps {
  project: string;
  advisor: string;
  evaluator: string;
  phase: "PARCIAL" | "FINAL";
  status: "CONCLUIDA" | "PENDENTE";
}

## EvaluatorCard

- Representa um avaliador da banca.

interface EvaluatorCardProps {
  name: string;
  role: string;
  partialStatus: EvaluationStatus;
  finalStatus: EvaluationStatus;
}


type EvaluationStatus =
  | "CONCLUIDA"
  | "PENDENTE";

- A interface deverá diferenciar visualmente avaliações concluídas e pendentes.

## DocumentCard

- Responsável por apresentar documentos do aluno.

interface DocumentCardProps {
  name: string;
  status: "PENDENTE" | "ASSINADO";
  onView: () => void;
  onSign?: () => void;
}

## SignatureModal

- Modal utilizado para confirmação de assinatura.

interface SignatureModalProps {
  documentName: string;
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

- A assinatura deverá exigir confirmação antes da ação ser concluída.

RankingTable

- Apresenta os projetos classificados.

interface RankingItem {
  position: number;
  project: string;
  area: string;
  score: number;
}


interface RankingTableProps {
  items: RankingItem[];
}
## Data Models

- Os modelos abaixo representam os principais dados necessários para a interface descrita na SPEC.

User
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
Project
interface Project {
  id: string;
  title: string;
  area: string;
  advisor: string;
  members: string[];
  summary: string;
  objectives: string;
  methodology: string;
  status: ProjectStatus;
}

As informações apresentadas na tela de projeto incluem título, área, status, informações gerais, resumo, objetivos, metodologia, orientador, integrantes, avaliações e resultado.

Document
interface Document {
  id: string;
  name: string;
  status: "PENDENTE" | "ASSINADO";
}
Evaluation
interface Evaluation {
  id: string;
  projectId: string;
  advisorId: string;
  evaluatorId: string;
  phase: "PARCIAL" | "FINAL";
  criteria: EvaluationCriterion[];
  status: EvaluationStatus;
}
Result
interface Result {
  projectId: string;
  finalScore: number;
  rankingPosition?: number;
}

## Correctness Properties

- As propriedades de corretude devem representar comportamentos que precisam permanecer verdadeiros independentemente dos dados específicos utilizados.

## Property 1: Navegação compatível com o perfil

- For any usuário autenticado com um perfil válido, a Sidebar SHALL apresentar somente as opções de navegação correspondentes ao seu perfil.

- Validates: Requisito de navegação por perfil.

## Property 2: Projeto mantém informações obrigatórias

- For any projeto válido, o sistema SHALL manter título, área, resumo, objetivos, metodologia e status disponíveis para visualização quando aplicável.

- Validates: Requisitos de cadastro e visualização de projeto.

## Property 3: Nota de avaliação permanece dentro da escala

- For any avaliação, cada nota atribuída a um critério SHALL estar entre 0 e 10.

0 <= nota <= 10

- Validates: Requisito do formulário de avaliação.

## Property 4: Avaliação pertence a uma etapa válida

- For any avaliação, sua etapa SHALL ser PARCIAL ou FINAL.

phase ∈ {PARCIAL, FINAL}

- Validates: Separação entre avaliação parcial e final.

## Property 5: Documento não pode ser assinado sem confirmação

- For any tentativa de assinatura de documento, a operação SHALL exigir confirmação explícita do usuário antes de concluir a assinatura.

- Validates: Fluxo de assinatura.

## Property 6: Status não depende exclusivamente de cor

- For any estado apresentado visualmente, SHALL existir algum indicador além da cor, como texto, ícone ou descrição.

- Validates: Requisito de acessibilidade.

## Property 7: Componentes equivalentes mantêm comportamento consistente

- For any componente reutilizado em diferentes telas, suas propriedades visuais e comportamentais SHALL permanecer consistentes.

- Validates: Princípio de consistência do design.

Error Handling
Cenário	Tratamento	| Feedback ao Usuário
E-mail inválido	| Impedir envio do formulário	 | Mensagem de validação abaixo do campo
Senha inválida ou ausente	| Impedir login	Mensagem de validação
Campo obrigatório vazio	| Impedir salvamento/envio	| Mensagem de erro abaixo do campo
Dados do projeto incompletos	| Impedir envio	| Indicação dos campos pendentes
Nota fora da escala 0–10	| Rejeitar valor |	Mensagem de validação
Tentativa de assinatura sem confirmação |	Não executar assinatura | Solicitar confirmação no modal
Exclusão sem confirmação	| Não executar exclusão	| Modal de confirmação
Usuário sem permissão |	Bloquear acesso à funcionalidade |	Mensagem de acesso não autorizado
Projeto indisponível |	Não renderizar dados inexistentes |	Mensagem informativa
Documento indisponível |	Impedir visualização/assinatura	| Toast ou mensagem informativa
Falha ao salvar	| Manter dados preenchidos quando possível |	Toast/mensagem de erro
Falha ao carregar dados	| Exibir estado de erro |	Mensagem para tentar novamente

- Os formulários deverão manter mensagens de erro abaixo dos respectivos campos.

Testing Strategy
Unit Tests

- Os testes unitários deverão validar componentes e funções isoladamente.

## Componentes
Navbar;
Sidebar;
Button;
Input;
Select;
Card;
ProjectCard;
StatusBadge;
IndicatorCard;
EvaluationForm;
EvaluationCard;
EvaluatorCard;
DocumentCard;
SignatureModal.

- A SPEC define esses componentes como elementos reutilizáveis da interface.

## Exemplos Sidebar:
- exibe opções corretas para ALUNO;
- exibe opções corretas para PROFESSOR_ORIENTADOR;
- exibe opções corretas para PROFESSOR_AVALIADOR;
- exibe opções corretas para ADMINISTRADOR.


## EvaluationForm:
- aceita notas de 0 a 10;
- rejeita notas menores que 0;
- rejeita notas maiores que 10.


## SignatureModal:
- abre corretamente;
- cancelar não realiza assinatura;
- confirmar realiza assinatura.
Property-Based Tests

- Os testes baseados em propriedades deverão gerar diferentes combinações de dados para verificar invariantes do sistema.

## Exemplos:

Para qualquer nota gerada:
0 <= nota <= 10


Para qualquer usuário:
role válido => Sidebar correspondente


Para qualquer projeto válido:
título + área + resumo + objetivos + metodologia
devem permanecer consistentes após salvar e carregar.


Para qualquer documento:
assinatura somente pode ocorrer após confirmação.
Integration Tests

Deverão verificar os fluxos completos da aplicação.

Fluxo de Login
Login
  ↓
Autenticação
  ↓
Identificação do perfil
  ↓
Dashboard correspondente
  ↓
Sidebar correspondente
Fluxo do Projeto
Cadastro
  ↓
Salvar
  ↓
Visualizar projeto
  ↓
Enviar projeto
  ↓
Avaliação
  ↓
Resultado
Fluxo de Avaliação
Projeto
  ↓
Avaliação Parcial
  ↓
Avaliação Final
  ↓
Resultado
  ↓
Ranking
Fluxo do Documento
Documento pendente
  ↓
Visualizar
  ↓
Assinar
  ↓
Confirmar
  ↓
Documento assinado
Design System
Cores

A identidade visual deverá utilizar os tokens definidos na SPEC:

Token	Hex	Uso
Primary Navy	#12355B	Cabeçalhos, títulos e elementos institucionais
Secondary Purple	#5B3FA3	Ações principais e destaques
Accent Blue	#4EA5D9	Informações e elementos secundários
Success Green	#36A269	Estados positivos
Highlight Yellow	#F2C14E	Atenção e destaques
Background	#F7F9FC	Fundo
Text	#17202A	Texto principal

Tipografia
Elemento	Tamanho	Peso
H1	32px	700
H2	24px	700
H3	20px	600
Texto	16px	400
Texto secundário	14px	400

A fonte deverá ser sem serifa.

## Accessibility

A interface deverá garantir:

Contraste adequado;
Foco visível;
Hierarquia tipográfica;
Labels nos campos;
Ícones acompanhados de texto quando necessário;
Não utilização exclusiva de cores para transmitir informações;
Navegação consistente.
UI Patterns
Cards

Os cards deverão possuir:

Fundo branco;
Bordas discretas;
Cantos arredondados;
Sombra leve;
Espaçamento interno consistente;
Hierarquia clara entre título e conteúdo.
Formulários

Todos os formulários deverão seguir:

Label
[ Campo ]


Label
[ Campo ]


Mensagem de erro


[ Cancelar ] [ Salvar ]

Os botões deverão ser alinhados ao final do formulário.

Modais
┌──────────────────────────────────────┐
│ Título                               │
│                                      │
│ Conteúdo                             │
│                                      │
│ [Cancelar]          [Confirmar]      │
└──────────────────────────────────────┘

Serão utilizados para:

Confirmações;
Assinaturas;
Exclusões;
Visualização rápida;
Alertas importantes.
Estados da Interface

A Timeline deverá representar as etapas do projeto:

● Inscrição
│
● Projeto enviado
│
● Avaliação parcial
│
○ Avaliação final
│
○ Resultado

Os estados possíveis são:

Concluído;
Atual;
Próximo;
Indisponível.

O Phase Banner deverá destacar a etapa atual do processo, como "Avaliação Parcial".

## Princípios de Design

O sistema deverá seguir cinco princípios fundamentais:

## Clareza

Informações importantes devem ser facilmente identificadas.

## Hierarquia

Títulos, informações e ações devem possuir níveis visuais distintos.

## Consistência

Componentes semelhantes devem possuir o mesmo comportamento e aparência.

## Simplicidade

Cada tela deverá apresentar apenas as informações necessárias para aquela etapa.

## Contexto
O usuário deverá compreender facilmente onde está, qual etapa está visualizando e quais ações estão disponíveis.
