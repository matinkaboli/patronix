(() => {
  let status = false;
  let token = 'AaYx3E8vy0iJtLpubIFPMdqnWg2U1rThw6BkNjeXQcsK7HCol5';
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
