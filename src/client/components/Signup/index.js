import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Menu from 'Components/Menu';
import Form from './Form';

import styles from './index.less';

class Signup extends Component {
  render() {
    return (
      <div>
        <Menu />
        <div className={styles.formContainer}>
          <Form />
          <Link to='/login'>حساب داری؟</Link>
        </div>
      </div>
    );
  }
}

export default Signup;
