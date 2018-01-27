import express from 'express';
import socketIO from 'socket.io';
import { join } from 'path';
import mongoose from 'mongoose';
import morgan from 'morgan';
import config from './config';

global.rootRequire = file => require(join(__dirname, file));

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
}

app.use('/static', express.static(join(__dirname, './static')));
