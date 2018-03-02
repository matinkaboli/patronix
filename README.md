# sockets

## change password

socket.emit('setting/password', old, new);

socket.once('setting/password', status);

status: 200 => successful, 403 => old pass was wrong

# change email

socket.emit('setting/email', email, password);

socket.once('setting/email', status);

status: 200 => successful, 400 => bad email or password
