(() => {
  let msgs = document.getElementById('patronix-chatlist');

  let socketUrl = `http://localhost:8010/client?token=${token}`;

  let socket = io(socketUrl);

  socket.on('report', reply => {
    console.log(reply);
  });

  let text = document.getElementById('chat');
  document.getElementById('send').addEventListener('click', () => {
    socket.emit('message', text.value);

    const d = document.createElement('div');
    d.classList.add('message-box');

    const date = new Date();
    const time = `${date.getHours()}:${date.getMinutes()}`;
    const p = document.createElement('p');
    p.classList.add('message-time');
    p.innerHTML = time;

    const msg = document.createElement('p');
    msg.classList.add('chat-message');
    msg.innerHTML = text.value;

    d.appendChild(msg);
    d.appendChild(p);

    msgs.appendChild(d);
  });

  socket.on('message', message => {
    const d = document.createElement('div');
    d.classList.add('message-box');
    d.classList.add('op');

    const date = new Date();
    const time = `${date.getHours()}:${date.getMinutes()}`;
    const p = document.createElement('p');
    p.classList.add('message-time');
    p.innerHTML = time;

    const msg = document.createElement('p');
    msg.classList.add('chat-message');
    msg.innerHTML = message;

    d.appendChild(msg);
    d.appendChild(p);

    msgs.appendChild(d);

    console.log(message);
  });
})();

const chatList = document.getElementById('patronix-chatlist');

chatList.classList.add('hidden-list');

document.getElementById('patronix-icon').onclick = function() {
  chatList.classList.toggle('hidden-list');
};
