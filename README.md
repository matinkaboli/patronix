# report types:

- 0 error
- 1 warning
- 2 success


# sockets

## remove avatar

socket.emit('setting/avatar/remove');

socket.once('setting/avatar/remove', status);

status: 200 => successful
