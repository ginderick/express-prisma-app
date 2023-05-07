import 'reflect-metadata';

import express from 'express';
import Logger from './loaders/logger';
import config from './config';

async function startServer() {
  const app = express();
  const port = config.port;

  await require('./loaders').default({expressApp: app});

  app
    .listen(port, () => {
      Logger.info(`
      ################################################
      🛡️  Server listening on port: ${port} 🛡️
      ################################################
    `);
    })
    .on('error', err => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer();
