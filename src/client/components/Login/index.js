import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Form from './Form';

import styles from './index.less';

class Login extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Form />
        <Link to='/signup'>ثبت نام</Link>
        <Link to='/recovery'>رمزت رو فراموش کردی؟</Link>
      </div>
    );
  }
}

export default Login;
