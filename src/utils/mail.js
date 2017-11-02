import { createTransport } from 'nodemailer';

const send = (to, text, flag, name = 'boddy') => {
  const transport = createTransport({
    service: 'gmail',
    auth: {
      user: 'matinkaboli79@gmail.com',
      pass: 'M@tinnim@125mailgmail'
    }
  });
  // Create a HTML page for email
  const mailOption = {
    from: 'matinkaboli79@gmail.com',
    to
  };
  if (flag === 'signup') {
    mailOption.html = `Welcome ${name}, click here to verify your account
                      <a href="127.0.0.1:8010/code/${text}">HERE</a>`;
  }
  transport.sendMail(mailOption, (err) => {
    if (err) {
      throw err;
    }
  });
};

export default send;
