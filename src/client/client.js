import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App';
import relogin from './relogin';

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
