import captcha from 'svg-captcha';

export const path = '/recovery';

export const needLogin = false;

export async function handler(socket) {
  let { data, text } = captcha.create({
    size: 4,
    ignore: 'o01il',
    color: true
  });

  socket.data.captcha = text.toLowerCase();

  return {
    status: 200,
    data: {
      captcha: data
    }
  };
}
