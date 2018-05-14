import io from 'socket.io-client';

let socket = io('/client', { query: `token=${localStorage.token}` });

if (process.env.NODE_ENV === 'development') {
  window.socket = socket;
  window.cocket = (ev, ...args) => {
    socket.emit(ev, ...args);
    socket.once(ev, (...args) => {
      console.log(...args);
    });
  };
}

export default socket;
