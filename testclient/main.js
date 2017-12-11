(() => {
  let status = false;
  let token = 'fYnc1kD8vQglZXKVUhx9mj7Rt0p4OSzBMFwIibsGrdJ5uAeTP3';
  let socketUrl = `http://codeminer:8010/service?token=${token}`;

  let socket = io(socketUrl);

  socket.emit('client:init');

  socket.on('client:init', () => {
    status = true;
  });

  socket.on('report', reply => {
    console.log(reply);
  });

  let text = document.getElementById('chat');
  document.getElementById('send').addEventListener('click', () => {
    socket.emit('client:message', text.value);
  });
})();
