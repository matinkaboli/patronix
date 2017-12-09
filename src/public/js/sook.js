let socket = io('/service');

fetch('/u/generate', { credentials: 'include', method: 'POST' })
  .then(data => data.text())
  .then(token => {
    socket.emit('op:init', token);
  });

socket.on('notification', site => {
  console.log('you have something like shit in site:', site);
});
