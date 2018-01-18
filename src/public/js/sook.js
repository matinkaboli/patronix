let socket = io('/operator');

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
});
