import express from 'express';
import Logger from './loaders/logger';

async function startServer() {
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.listen(8000, () => {
    // eslint-disable-next-line no-console
    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${8000} 🛡️
      ################################################
    `);
  });
}

startServer();
