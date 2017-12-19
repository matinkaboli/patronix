(() => {
  let token = 'pRSvIKNXqZi0tFCgGTDnQ4A5xYwaoju8cOsLB6UkEemr3zhlMb';
  let socketUrl = `http://codeminer:8010/client?token=${token}`;

  let socket = io(socketUrl);

  socket.on('report', reply => {
    console.log(reply);
  });

  let text = document.getElementById('chat');
  document.getElementById('send').addEventListener('click', () => {
    socket.emit('message', text.value);
  });
})();
