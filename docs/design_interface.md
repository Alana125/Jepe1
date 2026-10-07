# DESIGN DE INTERFACE — SISTEMA JEPE

## 1. Diretriz geral

A interface deverá seguir o layout definido no Figma do projeto, mantendo consistência visual entre as páginas.

O sistema deverá priorizar:

- clareza;
- organização;
- navegação simples;
- hierarquia visual;
- leitura rápida das informações;
- responsividade;
- componentes reutilizáveis.

---

# 2. Estrutura de navegação

## Professor

```text
Login
  ↓
Dashboard
  ├── Projetos
  ├── Avaliações
  ├── Resultados
  └── Perfil
```

## Administrador

```text
Login
  ↓
Dashboard
  ├── Projetos
  ├── Avaliações
  ├── Resultados
  ├── Professores
  ├── Áreas
  ├── Critérios
  ├── Períodos
  └── Indicadores
```

**Não haverá página ou menu de Ranking.**

---

# 3. Login

A tela deverá conter:

- identificação visual do sistema;
- campo de usuário/e-mail;
- campo de senha;
- botão de entrar;
- mensagens de erro;
- opção relacionada à recuperação de acesso, caso definida no Figma.

Após autenticação, o usuário deverá ser direcionado ao dashboard correspondente ao seu perfil.

---

# 4. Dashboard

O dashboard será a tela inicial após o login.

Deverá apresentar informações resumidas, como:

- total de projetos;
- projetos em avaliação;
- projetos avaliados;
- avaliações pendentes;
- próximos prazos;
- acesso aos resultados.

Para o administrador, poderão ser apresentados indicadores gerais da edição.

---

# 5. Projetos

## Lista de projetos

A tela deverá apresentar:

- título;
- área;
- professor responsável;
- situação;
- quantidade de avaliações, quando pertinente;
- ações disponíveis.

Deverá possuir:

- busca;
- filtros;
- botão para cadastrar projeto, quando permitido.

---

# 6. Cadastro de projeto

O formulário deverá conter:

### Informações principais
- título;
- área;
- professor responsável;
- integrantes.

### Informações acadêmicas
- resumo;
- objetivos;
- metodologia.

O sistema deverá informar claramente os campos obrigatórios e apresentar mensagens de validação.

---

# 7. Detalhes do projeto

A página deverá apresentar:

- título;
- área;
- professor responsável;
- integrantes;
- resumo;
- objetivos;
- metodologia;
- status;
- informações de avaliação, conforme permissão.

As ações disponíveis deverão variar de acordo com o perfil do usuário.

---

# 8. Avaliações

A área de avaliações deverá permitir ao professor visualizar os projetos disponíveis para avaliação.

Cada avaliação deverá apresentar:

- identificação do projeto;
- critérios configurados;
- campo de nota de 0 a 10 para cada critério;
- campo de comentário;
- botão para salvar.

O sistema deverá informar quando uma avaliação já tiver sido realizada.

---

# 9. Resultados

A área **Resultados** substituirá completamente a antiga área de Ranking.

Deverá apresentar:

- projetos avaliados;
- área;
- professor responsável;
- quantidade de avaliações;
- média final;
- classificação/situação;
- demais informações definidas pela organização.

Os resultados deverão ser organizados de forma clara para facilitar a consulta.

---

# 10. Administração

## Professores

Interface para:

- visualizar professores;
- cadastrar;
- editar;
- ativar/desativar, quando aplicável.

## Áreas

Interface para:

- listar áreas;
- cadastrar;
- editar;
- ativar/desativar.

## Critérios

Interface para:

- visualizar critérios;
- cadastrar;
- editar;
- definir critérios utilizados na avaliação.

## Períodos

Interface para:

- visualizar períodos;
- cadastrar;
- editar;
- definir períodos de inscrição e avaliação;
- controlar abertura e encerramento.

## Indicadores

Área destinada à visualização de informações consolidadas sobre:

- quantidade de projetos;
- projetos por situação;
- avaliações realizadas;
- avaliações pendentes;
- distribuição por área.

---

# 11. Componentes

A interface deverá utilizar componentes reutilizáveis, como:

- Header;
- Sidebar;
- Cards;
- Tabelas;
- Formulários;
- Inputs;
- Selects;
- Botões;
- Badges de status;
- Modal;
- Alertas;
- Paginação;
- Mensagens de validação;
- Estados de carregamento.

---

# 12. Estados da interface

O frontend deverá tratar:

- carregamento;
- sucesso;
- erro;
- lista vazia;
- ausência de permissão;
- sessão expirada;
- formulário inválido;
- operação concluída.

---

# 13. Tecnologia da interface

A interface será desenvolvida utilizando:

- React;
- Vite;
- JavaScript;
- React Router;
- CSS;
- consumo da API REST.

A comunicação com o backend deverá ocorrer exclusivamente por meio da API definida no projeto.