import 'babel-polyfill';
import express from 'express';
import socketIO from 'socket.io';
import { join } from 'path';
import mongoose from 'mongoose';
import morgan from 'morgan';
import { connect, applyMiddleware } from 'socket.io-manager';
import logger from 'socket.io-manager-logger';
import requireasarray from 'requireasarray';
import config from './config';
import { init } from './middles';

global.rootRequire = file => require(join(__dirname, file));

let sockets = requireasarray(join(__dirname, 'sockets'));
sockets = applyMiddleware([init], sockets);

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

if (process.env.NODE_ENV !== 'development') {
  app.use(morgan('short'));
  sockets = applyMiddleware([logger], sockets);
}

app.use('/static', express.static(join(__dirname, './static')));

app.use((req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

connect(io, sockets);
