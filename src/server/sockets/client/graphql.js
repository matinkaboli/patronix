import { SocketEvent } from 'socket.io-manager';
import { graphql } from 'graphql';

import schema from 'Root/schema';

let socket = new SocketEvent();

socket
.namespace('/client')
.name('graphql')
.handler(socket => query => {
  graphql(schema, query, null, socket).then(res => {
    console.log(res);
  }).catch(e => {
    console.log(e);
  });
});

export default socket;
