let socket = io('/operator');

fetch('/u/generate', { credentials: 'include', method: 'POST' })
  .then(data => data.text())
  .then(token => {
    socket.emit('init', token);
  });

socket.on('notification', (chat, site) => {
  $('#chat-list').appendText(nunjucks.render('chats.njk', { chat, site }));
});
