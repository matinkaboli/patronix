import io from 'socket.io-client';

let socket = io(
  'http://localhost:8010/customer',
  { query: `token=${
    document.getElementById('patronix-data').getAttribute('token')
  }` }
);

if (process.env.NODE_ENV === 'development') {
  window.socket = socket;
}

export default socket;
