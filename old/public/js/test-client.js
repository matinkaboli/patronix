(() => {
  let socketUrl = `http://localhost:8010/client?token=${token}`;

  let socket = io(socketUrl);

  socket.on('report', reply => {
    console.log(reply);
  });

  let text = document.getElementById('chat');
  document.getElementById('send').addEventListener('click', () => {
    socket.emit('message', text.value);
  });

  socket.on('message', message => {
    console.log(message);
  });
})();

const chatList = document.getElementById('patronix-chatlist');

chatList.classList.add('hidden-list');

document.getElementById('patronix-icon').onclick = function() {
  chatList.classList.toggle('hidden-list');
};
