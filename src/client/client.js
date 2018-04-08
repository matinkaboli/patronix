import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import relogin from './relogin';
import store from './store';
import './sockets';

import 'Root/styles/index.less';
import 'Root/styles/font-fa.less';
import 'izitoast/dist/css/iziToast.min.css';

window.onload = () => {
  relogin.then(() => {
    render(
      <Provider store={store}>
        <App/>
      </Provider>,
      document.getElementById('main')
    );
  });
};
