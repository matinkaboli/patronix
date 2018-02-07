import { resolve } from 'path';

export default {
  port: '8010',
  db: 'mongodb://localhost/patronix-dev',
  title: 'Patronix',
  url: 'http://localhost:8010',
  jwtkey: 'l4E7MDeLCt3SbrIoY2UHWBiONVh9f1RPGvg',
  uploadDir: resolve(__dirname, 'build/static/uploads'),
  enkey: 'Me0vfSudFwiPqhl78yRbTA1kW9VoIZ'
};
