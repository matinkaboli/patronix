import React, { Component } from 'react';

import Form from './Form';


import styles from './index.less';

class Login extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Form />
      </div>
    );
  }
}

export default Login;
