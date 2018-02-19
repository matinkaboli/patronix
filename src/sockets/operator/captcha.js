import { SocketEvent } from 'socket.io-manager';
import captcha from 'svg-captcha';


let socket = new SocketEvent();

socket
.namespace('/operator')
.name('captcha')
.handler(socket => () => {
  let { data, text } = captcha.create({
    size: 4,
    ignore: 'o01il',
    color: true
  });

  socket.data.captcha = text.toLowerCase();

  socket.emit('captcha', 200, data);
});

export default socket;
