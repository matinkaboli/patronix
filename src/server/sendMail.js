import { createTransport } from 'nodemailer';

const transport = createTransport({
  service: 'aol',
  auth: {
    user: 'patronixapp@aol.com',
    pass: 'yoissupbro'
  }
});

export default option => new Promise((resolve, reject) => {
  transport.sendMail(
    {
      from: 'Patronix App <patronixapp@aol.com>',
      ...option
    },
    err => {
      if (err) {
        reject();
        return;
      }

      resolve();
    }
  );
});
