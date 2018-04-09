import { resolve } from 'path';

let config = {
  uploadDir: resolve(__dirname, 'static/uploads'),
  otkey: 'l4E7MDeLCt3SbrIoY2UHWBiONVh9f1RPGvg',
  dbkey: 'Me1vfSudFwiPqhl78yRbTA1kW9VoIZ',
  db: 'mongodb://localhost/patronix-dev',
  prodUrl: 'https://patronix.ir',
  devUrl: 'http://localhost:8010',
  title: 'Patronix',
  port: '443',
  devPort: '8010',
};

if (process.env.NODE_ENV === 'development') {
  config.port = config.devPort;
}

export default config;
