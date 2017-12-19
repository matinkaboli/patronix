$('#take').on('click', e => {
  socket.emit('take', e.target.getAttribute('data-id'));
});
