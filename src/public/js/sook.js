let socket = io('/service');

fetch('/u/generate', { credentials: 'include', method: 'POST' })
  .then(data => data.text())
  .then(token => {
    socket.emit('op:init', token);
  });
