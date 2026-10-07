# BRIEFING — SISTEMA JEPE

## 1. Identificação

**Nome:** Sistema JEPE — Jornada de Ensino, Pesquisa e Extensão do IFAL

**Instituição:** Instituto Federal de Alagoas — IFAL

**Tipo:** Sistema web para gerenciamento de projetos acadêmicos.

---

## 2. Contexto

A Jornada de Ensino, Pesquisa e Extensão (JEPE) é um evento destinado à apresentação e avaliação de projetos desenvolvidos no IFAL, promovendo a integração entre ensino, pesquisa, extensão, inovação e comunidade acadêmica.

O sistema será desenvolvido para centralizar as etapas de cadastro, organização, avaliação e acompanhamento dos projetos da JEPE.

---

## 3. Problema

O processo de inscrição dos projetos, organização das avaliações e consolidação das notas pode ser realizado de forma manual ou descentralizada.

Isso pode gerar:

- dificuldade no acompanhamento dos projetos;
- dificuldade na distribuição e controle das avaliações;
- possibilidade de conflitos entre avaliador e projeto;
- demora na consolidação das notas;
- dificuldade para acompanhar os resultados;
- falta de centralização das informações.

---

## 4. Objetivo

Desenvolver um sistema web que permita organizar digitalmente o processo da JEPE, desde o cadastro dos projetos até sua avaliação e apresentação dos resultados.

O sistema deverá centralizar:

- projetos;
- professores;
- integrantes;
- áreas;
- critérios;
- períodos;
- avaliações;
- notas;
- resultados;
- indicadores administrativos.

---

## 5. Público e perfis

### Professor

O professor possuirá um único perfil no sistema, podendo exercer diferentes funções conforme o contexto.

Poderá:

- cadastrar e acompanhar projetos;
- atuar como professor responsável/orientador;
- visualizar projetos;
- realizar avaliações;
- registrar notas;
- adicionar comentários;
- editar sua avaliação enquanto o período estiver aberto;
- consultar resultados.

O professor não poderá avaliar um projeto no qual esteja registrado como orientador/responsável.

### Administrador/Organização

Responsável pelo gerenciamento do sistema e da edição da JEPE.

Poderá:

- gerenciar professores;
- gerenciar projetos;
- configurar áreas;
- configurar critérios;
- configurar períodos;
- acompanhar avaliações;
- consultar resultados;
- visualizar indicadores.

### Aluno

O aluno **não será usuário do sistema nesta versão**.

A participação dos alunos ocorrerá por meio do cadastro dos integrantes de cada projeto.

Funcionalidades específicas para login e área do aluno ficam para uma versão futura.

---

## 6. Principais funcionalidades

### Autenticação
- Login;
- controle de acesso;
- diferenciação entre professor e administrador.

### Projetos
- cadastro;
- edição;
- visualização;
- definição da área;
- definição do professor responsável;
- cadastro dos integrantes;
- resumo;
- objetivos;
- metodologia;
- acompanhamento do status.

### Avaliações
- listagem dos projetos disponíveis para avaliação;
- preenchimento dos critérios;
- notas de 0 a 10;
- comentário;
- edição da própria avaliação durante o período permitido;
- bloqueio de avaliação do próprio projeto/orientado.

### Resultados
- consulta dos projetos avaliados;
- médias finais;
- notas;
- situação/classificação dos projetos;
- consolidação das avaliações.

### Administração
- professores;
- áreas;
- critérios;
- períodos;
- resultados;
- indicadores.

---

## 7. Status dos projetos

O fluxo principal será:

**Inscrito → Em avaliação → Avaliado → Classificado**

---

## 8. Tecnologia

### Frontend
- React;
- Vite;
- React Router;
- JavaScript;
- HTML/CSS.

### Backend
- Node.js;
- Express;
- API REST.

### Banco de dados
- PostgreSQL;
- migrations;
- JSONB para armazenamento das notas por critério.

### Documentação
- OpenAPI/Swagger.

### Arquitetura

```text
Interface React/Vite
        ↓
REST API
        ↓
Node.js + Express
        ↓
Services / Repositories
        ↓
PostgreSQL
```

---

## 9. Fora do escopo

Não fazem parte da primeira versão:

- login de alunos;
- área específica do aluno;
- inscrição realizada diretamente pelo aluno;
- upload de arquivos;
- artigos completos;
- certificados;
- votação pública;
- controle de presença;
- gerenciamento de salas ou estandes;
- calendário completo do evento;
- sistema de ranking.

---

## 10. Resultado esperado

O Sistema JEPE deverá proporcionar uma plataforma centralizada para gerenciamento dos projetos e avaliações, reduzindo processos manuais e facilitando o acompanhamento das informações pela organização e pelos professores.