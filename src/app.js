import 'babel-polyfill';
import https from 'https';
import http from 'http';
import express from 'express';
import socketIO from 'socket.io';
import { connect, applyMiddleware } from 'socket.io-manager';
import logger from 'socket.io-manager-logger';
import mongoose from 'mongoose';
import process from 'process';
import { join } from 'path';
import morgan from 'morgan';
import { readFileSync } from 'fs';

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

if (process.env.NODE_ENV !== 'development') {
  http.createServer(function(req, res) {
      res.writeHead(301, { Location: 'https://' + req.headers.host + req.url });
      res.end();
  }).listen(80);
}

(async () => {
  await User.update({}, { $set: { socket: null } });

  const app = express();
  let server;

  if (process.env.NODE_ENV === 'development') {
    server = app.listen(config.port);

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
    server = https.createServer({
      cert: readFileSync('./sslcert/fullchain.pem'),
      key: readFileSync('./sslcert/private.pem')
    }, app).listen(config.port);
  }


  const io = socketIO(server);

  app.use('/static', express.static(join(__dirname, './static')));

  app.use((req, res) => {
    res.sendFile(join(__dirname, '/index.html'));
  });

  connect(io, modified);
})();
