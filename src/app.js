import 'babel-polyfill';
import express from 'express';
import socketIO from 'socket.io';
import { connect, applyMiddleware } from 'socket.io-manager';
import logger from 'socket.io-manager-logger';
import mongoose from 'mongoose';
import process from 'process';
import { join } from 'path';
import morgan from 'morgan';

import { init } from './middlewares';
import sockets from './sockets';
import config from './config';
import { User } from './models';

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
  await User.update({}, { $set: { socket: null } });

  const app = express();
  const server = app.listen(config.port);
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
