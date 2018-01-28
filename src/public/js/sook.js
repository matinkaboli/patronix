let socket = io('/operator');
const msgs = document.getElementById('messages');

fetch('/u/generate', { credentials: 'include', method: 'POST' })
.then(data => data.text())
.then(token => {
  socket.emit('setup', token);
});

socket.on('notification', (chat, site) => {
  $('#chat-list').appendText(nunjucks.render('chats.njk', { chat, site }));
});

$('#send').on('click', () => {
  socket.emit('message', $('#message').value);

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
  msg.innerHTML = $('#message').value;

  d.appendChild(msg);
  d.appendChild(p);

  console.log(msgs.style);
  msgs.appendChild(d);
});

socket.on('message', message => {
  const d = document.createElement('div');
  d.classList.add('message-box');

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

  msgs.scroll(0, msgs.scrollHeight + 50);
  msgs.appendChild(d);
});
