# Design da Aplicação — JEPE
## Jornada de Ensino, Pesquisa e Extensão

## 1. Objetivo

Definir as diretrizes visuais e de experiência do usuário da aplicação JEPE.

Este documento aborda apenas design visual, experiência do usuário, identidade, cores, tipografia, layout, componentes, estados, responsividade e acessibilidade. Não inclui arquitetura técnica, backend, banco de dados, APIs ou regras de negócio.

---

## 2. Princípios de Design

A interface deve ser:

- clara e objetiva;
- institucional e confiável;
- acessível e inclusiva;
- consistente em todas as telas;
- responsiva e adaptável;
- centrada no usuário e no conteúdo.

Deve priorizar legibilidade, navegação intuitiva e hierarquia visual clara.

---

## 3. Identidade Visual

### 3.1 Conceito

A identidade da JEPE deve refletir a integração entre ensino, pesquisa e extensão, com tom acadêmico e institucional.

### 3.2 Estilo

- limpo e moderno;
- sóbrio, sem excesso de elementos decorativos;
- uso equilibrado de cores e espaços;
- foco na clareza e na organização da informação.

---

## 4. Paleta de Cores

### 4.1 Cores principais

| Token | Nome | HEX | Uso |
|---|---|---|---|
| primary-navy | Azul profundo | #12355B | Cabeçalhos, navegação e títulos |
| secondary-purple | Roxo científico | #5B3FA3 | Botões principais e destaques |
| ccent-blue | Azul claro | #4EA5D9 | Elementos de apoio, links e estados de foco |
| success-green | Verde inovação | #36A269 | Feedback de sucesso e estados positivos |
| highlight-yellow | Amarelo destaque | #F2C14E | Chamadas de atenção e indicadores |
| ackground | Fundo | #F7F9FC | Fundo geral das telas |
| 	ext | Texto | #17202A | Texto principal |

### 4.2 Uso das cores

As cores podem reforçar áreas temáticas sem depender apenas delas para transmitir significado.

- Ensino → #4EA5D9;
- Pesquisa → #5B3FA3;
- Extensão → #36A269;
- Destaques leves → #F2C14E.

Sempre combine cor com texto, ícones ou formas para maior acessibilidade.

---

## 5. Tipografia

A tipografia deve ser sem serifa, com forte hierarquia e boa legibilidade.

### 5.1 Hierarquia tipográfica

#### H1
- 32px;
- peso 700;
- #12355B.

#### H2
- 24px;
- peso 700;
- #12355B.

#### H3
- 20px;
- peso 600;
- #12355B.

#### Texto principal
- 16px;
- peso 400;
- #17202A.

#### Texto secundário
- 14px;
- peso 400;
- cinza neutro.

### 5.2 Legibilidade

Mantenha espaçamento entre linhas confortável e contraste adequado entre texto e fundo.

---

## 6. Espaçamento e Grid

Use uma escala de espaçamento baseada em múltiplos de 8px: 8, 16, 24, 32, 48 e 64.

O layout deve ser coerente e alinhado em colunas, com margens e preenchimentos consistentes.

---

## 7. Layout Geral

### 7.1 Estrutura de página

Cada página deve incluir:

- cabeçalho com navegação e identidade;
- título e subtítulo quando necessário;
- área principal de conteúdo;
- ações contextuais visíveis;
- painéis e cards para informações secundárias.

### 7.2 Páginas internas

Em telas internas, use navegação lateral ou abas para separar seções sem sobrecarregar o usuário.

---

## 8. Navegação

### 8.1 Barra superior

- fundo #12355B;
- logo JEPE em branco;
- links e texto em branco;
- item ativo destacado em #4EA5D9 ou #5B3FA3;
- botão principal em #5B3FA3.

### 8.2 Navegação lateral

- fundo claro;
- texto escuro legível;
- indicador de seleção claro;
- espaçamento generoso entre itens.

---

## 9. Tela de Login

### 9.1 Objetivo

Oferecer uma entrada simples e acessível ao sistema.

### 9.2 Layout

- card centralizado;
- fundo #F7F9FC;
- campos com bordas suaves;
- botão principal #5B3FA3;
- feedback de erro evidente.

### 9.3 Componentes

- título e subtítulo claros;
- campo de e-mail;
- campo de senha;
- botão de login;
- link de recuperação ou ajuda, se houver.

---

## 10. Dashboard

### 10.1 Objetivo

Oferecer visão imediata do estado geral e das métricas principais.

### 10.2 Estrutura

- saudação ou contexto;
- indicadores em cards;
- filtros e busca;
- gráficos ou painéis de resumo;
- lista de itens recentes.

### 10.3 Cards de indicadores

- fundo branco;
- bordas suaves;
- título pequeno;
- valor em destaque;
- cor de apoio moderada;
- espaçamento interno consistente.

---

## 11. Lista de Projetos

### 11.1 Objetivo

Facilitar a localização e acompanhamento dos projetos.

### 11.2 Elementos

- busca por título;
- filtros por área e situação;
- cards de projeto;
- indicação clara de status.

### 11.3 Cartão de projeto

Cada cartão deve incluir:

- título do projeto;
- área temática;
- status;
- resumo curto;
- ação de acesso rápido.

### 11.4 Status visuais

- Inscrito → #5B3FA3;
- Em avaliação → #F2C14E;
- Avaliado → #36A269;
- Classificado → #12355B.

---

## 12. Cadastro e Edição de Projeto

### 12.1 Objetivo

Permitir preencher e revisar dados do projeto com clareza.

### 12.2 Estrutura

- informações gerais;
- descrição e objetivos;
- integrantes;
- ações de salvar e cancelar.

### 12.3 Campos

- labels acima dos campos;
- foco em #4EA5D9;
- ajuda em texto cinza;
- erros próximos ao campo;
- espaçamento uniforme.

### 12.4 Botões

- primário: #5B3FA3;
- secundário: #36A269 ou neutro;
- cancelamento discreto.

---

## 13. Detalhes do Projeto

### 13.1 Objetivo

Exibir informações completas do projeto de forma organizada.

### 13.2 Layout

- título e status;
- resumo;
- objetivos;
- metodologia;
- orientador e integrantes;
- avaliações.

Use cards e separadores leves para melhorar a leitura.

---

## 14. Tela de Avaliação

### 14.1 Objetivo

Permitir avaliação clara e estruturada do projeto.

### 14.2 Estrutura

- identificação do projeto;
- critérios em sequência;
- controles de nota;
- campo de comentário;
- botão de envio destacado.

### 14.3 Critérios

Cada critério deve ter:

- label clara;
- controle de pontuação;
- indicação de preenchimento;
- feedback visual quando incompleto.

---

## 15. Área Administrativa

### 15.1 Objetivo

Oferecer painéis claros para gerenciamento de configurações.

### 15.2 Estrutura

- navegação lateral ou abas;
- páginas para áreas, critérios, períodos e usuários;
- tabelas legíveis;
- ações acessíveis.

### 15.3 Tabelas

- fundo branco;
- linhas e colunas claras;
- rolagem horizontal em telas menores;
- botões de ação visíveis.

---

## 16. Elementos de Interface

### 16.1 Botões

- primário: #5B3FA3;
- secundário: #36A269;
- neutro: branco ou transparente;
- estados: normal, hover, foco, desabilitado.

### 16.2 Cards

- fundo branco;
- bordas suaves;
- sombra leve;
- espaçamento interno consistente;
- títulos em #12355B;
- texto secundário em cinza.

### 16.3 Formulários

- labels visíveis;
- placeholders quando necessário;
- estados normal/foco/erro/desabilitado;
- mensagens de validação claras.

### 16.4 Feedback

- sucesso: #36A269;
- atenção: #F2C14E;
- erro: cor de alerta contrastante.

---

## 17. Responsividade

A interface deve funcionar bem em notebooks e telas semelhantes.

No notebook:

- layout em colunas quando possível;
- cards com largura controlada;
- formulários sem rolagem horizontal desnecessária;
- botões fáceis de usar.

---

## 18. Acessibilidade

- contraste adequado;
- fontes legíveis;
- áreas de clique confortáveis;
- navegação por teclado;
- labels claras;
- mensagens compreensíveis.

---

## 19. Componentes Reutilizáveis

Os componentes devem ser consistentes e reutilizáveis:

- Navbar
- Sidebar
- Button
- Input
- Select
- Card
- ProjectCard
- StatusBadge
- IndicatorCard
- SearchBar
- Filter
- Modal
- Toast
- EvaluationForm
- AdminTable

---

## 20. Critérios de Aceitação

- paleta JEPE aplicada de forma consistente;
- hierarquia tipográfica uniforme;
- layouts claros e organizados;
- componentes visuais consistentes;
- experiência responsiva em notebooks;
- feedback claro de sucesso, aviso e erro;
- navegação simples e previsível;
- foco exclusivo em design visual e UX.
