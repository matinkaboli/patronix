import React, { Component } from 'react';
import bind from 'Root/bind';
import socket from 'Root/socket';
import izitoast from 'izitoast';
import { Link } from 'react-router-dom';

import { e, p } from 'Root/libs/validator';

import styles from './index.less';

class Signup extends Component {
  @bind
  signup() {
    if (e(this.refs.email.value)) {
      if (p(this.refs.password.value)) {
        socket.once('signup', res => {
          console.log(res);
        });

        socket.emit('signup', {
          name: {
            first: this.refs.fname.value,
            last: this.refs.lname.value
          },
          email: this.refs.email.value,
          password: this.refs.password.value
        });
      } else {
        izitoast.warning({
          rtl: true,
          title: 'رمز باید حداقل هشت رقم باشد'
        });
        this.refs.password.focus();
      }
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

        <Link to='/login'>حساب داری؟</Link>

      </div>
    );
  }
}

export default Signup;
