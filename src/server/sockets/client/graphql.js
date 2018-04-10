import { SocketEvent } from 'socket.io-manager';
import { graphql } from 'graphql';

import schema from 'Root/schema';
import middlewares from 'Root/middlewares';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('graphql')
.middleware(
  middlewares.client.checkToken
)
.handler(socket => query => {
  graphql(schema, query, {}, socket).then(res => {
    socket.emti('graphql', res);
  }).catch(() => {
    socket.emit('graphql', 'error');
  });
});

export default socket;
