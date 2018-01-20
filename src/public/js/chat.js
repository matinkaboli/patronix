$('#take').on('click', e => {
  socket.emit('take', e.target.getAttribute('data-id'));
  $('#send-message-form').toggleClass('hidden-el');

  $('#take').addClass('hidden-el');
});
