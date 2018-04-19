import { resolve } from 'path';

let config = {
  uploadDir: resolve(__dirname, 'static/uploads'),
  otkey: 'l4E7MDeLCt3SbrIoY2UHWBiONVh9f1RPGvg',
  dbkey: 'Me1vfSudFwiPqhl78yRbTA1kW9VoIZ',
  db: 'mongodb://localhost/patronix',
  url: 'https://patronix.ir',
  devUrl: 'http://localhost:8010',
  title: 'Patronix',
  port: '443'
};

if (process.env.NODE_ENV === 'development') {
  config.port = '8010';
  config.db = 'mongodb://localhost/patronix-dev';
}

export default config;
