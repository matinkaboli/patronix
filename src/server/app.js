import 'babel-polyfill';
import spdy from 'spdy';
import http from 'http';
import { join } from 'path';
import morgan from 'morgan';
import helmet from 'helmet';
import express from 'express';
import process from 'process';
import mongoose from 'mongoose';
import socketIO from 'socket.io';
import { readFileSync } from 'fs';
import logger from 'socket.io-manager-logger';
import { connect, applyMiddleware } from 'socket.io-manager';

import config from './config';
import { User } from './models';
import sockets from './sockets';
import { init } from './middlewares';

let modified = applyMiddleware([init], sockets);

mongoose.Promise = global.Promise;
mongoose.connect(config.db, () => {
  console.log('Connected to database successfully!');
});

mongoose.connection.on('error', error => {
  console.error(`Database connection error ${error}`);

  process.exit(1);
});

mongoose.connection.on('disconnected', () => {
  console.error('Disconnected from database');

  process.exit(1);
});

if (process.env.NODE_ENV === 'production') {
  http.createServer(function(req, res) {
      res.writeHead(301, { Location: `${config.url}${req.url}` });
      res.end();
  }).listen(80);
}

(async () => {
  await User.update({}, { $set: { socket: null } });

  const app = express();
  let server;

  if (process.env.NODE_ENV === 'development') {
    server = app.listen(config.port, () => {
      console.log('The server is running!');
    });

    app.use(morgan('short'));

    let filtered = ['setting/avatar/update'];
    modified = [
      ...modified.filter(so => filtered.includes(so._name)),
      ...applyMiddleware([logger],
        modified.filter(so => !filtered.includes(so._name))
      )
    ];
  }

  else {
    server = spdy.createServer({
      cert: readFileSync(join(__dirname, 'sslcert/fullchain.pem')),
      key: readFileSync(join(__dirname, 'sslcert/private.pem'))
    }, app).listen(config.port);
  }


  const io = socketIO(server);

  app.use('/static', express.static(join(__dirname, './static')));

  app.use(helmet());

  app.use((req, res) => {
    res.sendFile(join(__dirname, '/index.html'));
  });

  connect(io, modified);
})();
