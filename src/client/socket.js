import io from 'socket.io-client';

let socket = io('/client');

if (process.env.NODE_ENV === 'development') {
  window.socket = socket;
}

export default socket;
