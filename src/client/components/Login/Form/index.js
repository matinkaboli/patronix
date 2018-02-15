import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './index.less';

class Form extends Component {
  render() {
    return (
      <div className={styles.form}>

        <input
          type='email'
          ref='email'
          placeholder='ایمیل'/>

        <input
          type='password'
          ref='password'
          placeholder='رمز' />

        <button onClick={this.login}>ورود</button>

        <Link to='/signup'>ثبت نام</Link>
        <Link to='/recovery'>رمزت رو فراموش کردی؟</Link>

      </div>
    );
  }
}

export default Form;
