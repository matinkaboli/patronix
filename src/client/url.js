let url = 'https://patronix.ir';

if (process.env.NODE_ENV === 'development') {
  url = 'http://localhost:8010';
}

export default url;
