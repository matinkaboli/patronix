import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App';
import './sockets';

import 'Root/styles/index.less';

window.onload = () => {
  render(
    <Provider store={store}>
      <App/>
    </Provider>,
    document.getElementById('patronix-land')
  );
};
