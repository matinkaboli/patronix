import 'babel-polyfill';
import express from 'express';
import socketIO from 'socket.io';
import { join } from 'path';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { connect, applyMiddleware } from 'socket.io-manager';
import logger from 'socket.io-manager-logger';
import process from 'process';

import sockets from './sockets';
import { init } from './middlewares';
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

app.use('/statics', express.static(join(__dirname, './statics')));

app.use((req, res) => {
  res.sendFile(join(__dirname, '/index.html'));
});

connect(io, modified);
