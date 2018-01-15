(() => {
  let token = 'zu3Q1Gvr8M0mcJBwfS59yqgldtC2s7RPZbapLHYFVxDoj6hiOE';
  let socketUrl = `http://localhost:8010/client?token=${token}`;

  let socket = io(socketUrl);

  socket.on('report', reply => {
    console.log(reply);
  });

  let text = document.getElementById('chat');
  document.getElementById('send').addEventListener('click', () => {
    socket.emit('message', text.value);
  });
})();
