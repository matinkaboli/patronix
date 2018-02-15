import React, { Component } from 'react';
import { connect } from 'react-redux';
import izitoast from 'izitoast';

import bind from 'Root/bind';
import loginAct from 'Root/actions/login';
import { e } from 'Root/libs/validator';

import styles from './index.less';

class Login extends Component {
  @bind
  login() {
    if (e(this.refs.email.value)) {
      this.props.dispatch(loginAct({
        email: this.refs.email.value,
        password: this.refs.password.value,
        push: this.props.history.push
      }));
    } else {
      izitoast.warning({
        rtl: true,
        title: 'ایمیل اشتباه است'
      });
      this.refs.email.focus();
    }
  }

  render() {
    return (
      <div className={styles.container}>

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

          <a href='/signup'>ثبت نام کن</a>
          <a href='/recovery'>رمزت رو فراموش کردی؟</a>

        </div>

      </div>
    );
  }
}

export default connect()(Login);
