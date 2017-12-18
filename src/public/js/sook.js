let socket = io('/service');

fetch('/u/generate', { credentials: 'include', method: 'POST' })
  .then(data => data.text())
  .then(token => {
    socket.emit('op:init', token);
  });

socket.on('notification', (chat, site) => {
  console.log(chat, site);
  $('#chat-list').appendText(nunjucks.render('chats.njk', { chat, site }));
});
