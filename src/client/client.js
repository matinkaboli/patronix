import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App';
import relogin from './relogin';
import 'Root/styles/index.less';
import 'Root/styles/font-fa.less';
import 'izitoast/dist/css/iziToast.min.css';
import 'izimodal/css/iziModal.min.css';

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
