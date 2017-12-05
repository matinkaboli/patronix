let socket = io('/chat');

fetch('/u/generate', { credentials: 'include', method: 'POST' })
  .then(data => data.text())
  .then(key => {
    socket.emit('init', key);
  });
