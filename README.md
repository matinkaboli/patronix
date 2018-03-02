# report types:

- 0 error
- 1 warning
- 2 success


# sockets

## remove avatar

socket.emit('setting/avatar/remove');

socket.once('setting/avatar/remove', status);

status: 200 => successful

## change password

socket.emit('setting/password', old, new);

socket.once('setting/password', status);

status: 200 => successful, 403 => old pass was wrong

## change name

socket.emit('setting/name', name);

socket.once('setting/name', status);

status: 200 => successful
