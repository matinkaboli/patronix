import { createTransport } from 'nodemailer';

const send = (to, text, flag, name = 'mate') => {
  const transport = createTransport({
    service: 'gmail',
    auth: {
      user: 'matinkaboli79@gmail.com',
      pass: 'M@tinnim@125mailgmail'
    }
  });
  // Create a HTML page for email
  const mailOption = { from: 'matinkaboli79@gmail.com', to };
  if (flag === 'signup') {
    mailOption.html = `Hello ${name}, click here to verify your account
                      <a href="@@LINK@@/active/${text}">HERE</a>`;
  } else if (flag === 'forgot') {
    mailOption.html = `Hello ${name}, click here to change your password
                      <a href="@@LINK@@/forgot/changepass/${text}">HERE</a>`;
  }
  transport.sendMail(mailOption, err => {
    if (err) {
      throw err;
    }
  });
};

export default send;
