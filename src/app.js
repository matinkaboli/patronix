import 'babel-polyfill';
import https from 'https';
import express from 'express';
import socketIO from 'socket.io';
import { connect, applyMiddleware } from 'socket.io-manager';
import logger from 'socket.io-manager-logger';
import mongoose from 'mongoose';
import process from 'process';
import { join } from 'path';
import morgan from 'morgan';
import { readFileSync } from 'fs';

import { SocketStore } from './models';
import { init } from './middlewares';
import sockets from './sockets';
import config from './config';

let modified = applyMiddleware([init], sockets);

mongoose.Promise = global.Promise;
mongoose.connect(config.db);

mongoose.connection.on('error', () => {
  process.exit(0);
});

mongoose.connection.on('disconnected', () => {
  process.exit(0);
});

(async () => {
  await SocketStore.remove({});

  const app = express();
  const server = https.createServer({
    cert: readFileSync('./sslcert/fullchain.pem'),
    key: readFileSync('./sslcert/private.pem')
  }).listen(config.port);
  const io = socketIO(server);

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('short'));
    let filtered = ['setting/avatar/update'];
    modified = [
      ...modified.filter(so => filtered.includes(so._name)),
      ...applyMiddleware([logger],
        modified.filter(so => !filtered.includes(so._name))
      )
    ];
  }

  app.use('/static', express.static(join(__dirname, './static')));

  app.use((req, res) => {
    res.sendFile(join(__dirname, '/index.html'));
  });

  connect(io, modified);
})();
