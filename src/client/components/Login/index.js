import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Form from './Form';
import Menu from 'Components/Menu';

import styles from './index.less';

class Login extends Component {
  render() {
    return (
      <div>
        <Menu />
        <div className={styles.formContainer}>
          <Form />
          <Link to='/signup'>ثبت نام</Link>
          <Link to='/recovery'>رمزت رو فراموش کردی؟</Link>
        </div>
      </div>
    );
  }
}

export default Login;
