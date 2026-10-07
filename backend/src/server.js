require("dotenv").config();

const app = require("./app");

const port = Number(process.env.PORT || 3000);

function start() {
  const server = app.listen(port, () => {
    console.info(`JEPE API listening on port ${port}`);
  });

  const shutdown = () => {
    server.close(async (error) => {
      if (error) {
        console.error("Error while closing the HTTP server:", error);
        process.exitCode = 1;
      }

      await app.locals.pool.end();
    });
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

start();
