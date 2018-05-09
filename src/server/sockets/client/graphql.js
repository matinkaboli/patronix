import { SocketEvent } from 'socket.io-manager';
import { graphql } from 'graphql';

import schema from 'Root/schema';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('graphql')
.handler(({ socket }) => query => {
  graphql(schema, query, {}, socket).then(res => {
    socket.emit('graphql', res);
  }).catch(() => {
    socket.emit('graphql', 'error');
  });
});

export default socket;
