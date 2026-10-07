# Backend JEPE

API REST em Node.js, Express e PostgreSQL.

## Requisitos

- Node.js 20 ou superior;
- PostgreSQL.

## Configuração local

1. Instale as dependências:

   ```powershell
   npm install
   ```

2. Copie `.env.example` para `.env` e ajuste `DATABASE_URL` para a sua instância PostgreSQL.
3. Crie o banco `jepe` no PostgreSQL, se ainda não existir.
4. Aplique as migrations:

   ```powershell
   npm run db:migrate
   ```

5. Inicie a API:

   ```powershell
   npm run dev
   ```

A API inicia na porta `3000` por padrão. O endpoint `GET /api/v1/health` verifica se a aplicação está respondendo.

O servidor HTTP pode iniciar mesmo quando o PostgreSQL está indisponível, para que `/health` continue acessível. Cadastro, login e consultas de dados retornam `503 DATABASE_UNAVAILABLE` até configurar a conexão e aplicar as migrations. Configure `JWT_SECRET` com um segredo aleatório de pelo menos 32 caracteres no `.env`; fora de produção, se omitido, a sessão usa uma chave temporária e será invalidada ao reiniciar.

Após iniciar o PostgreSQL, aplique a migration e crie a primeira conta pela tela **Cadastro JEPE**. O cadastro público cria um professor e aceita qualquer domínio de e-mail válido. A API atualmente implementa cadastro, login e consultas autenticadas de áreas, critérios, períodos, projetos, avaliações e resultados; operações de escrita restantes ainda precisam ser implementadas conforme as tarefas.

## Verificação

```powershell
npm test
```

Para reverter a migration mais recente:

```powershell
npm run db:rollback
```
