import io from 'socket.io-client';
import url from 'Root/url';

let socket = io(
  `${url}/customer`,
  { query: `token=${
    document.getElementById('patronix-data').getAttribute('token')
  }` }
);

if (process.env.NODE_ENV === 'development') {
  window.socket = socket;
}

export default socket;
