import React, { Component } from 'react';
import { connect } from 'react-redux';
import izitoast from 'izitoast';

import bind from 'Root/bind';
import loginAct from 'Root/actions/login';
import { email } from 'Root/libs/validator';

import styles from './index.less';

class Form extends Component {
  @bind
  login() {
    if (email(this.refs.email.value)) {
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
      <div className={styles.form}>

        <input
          type='text'
          ref='fname'
          placeholder='نام' />

        <input
          type='text'
          ref='lname'
          placeholder='نام خانوادگی' />

        <input
          type='email'
          ref='email'
          placeholder='ایمیل' />

        <input
          type='password'
          ref='password'
          placeholder='رمز' />

        <button onClick={this.signup}>ثبت نام</button>

      </div>
    );
  }
}

export default Form;
