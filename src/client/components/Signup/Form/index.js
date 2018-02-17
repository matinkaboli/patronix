import React, { Component } from 'react';
import izitoast from 'izitoast';

import bind from 'Root/bind';
import signup from 'Root/actions/signup';
import { email, password } from 'Root/libs/validator';

import styles from './index.less';

class Form extends Component {
  state = {
    displayValidateError: false
  };

  @bind
  signup(e) {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      this.setState({ displayValidateError: true });
      return;
    }
    this.setState({ displayValidateError: false });

    if (email(this.refs.email.value)) {
      if (password(this.refs.password.value)) {
        signup({
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
    const { displayValidateError } = this.state;

    return (
      <form className={`${styles.form}
      ${displayValidateError ? 'displayValidateError' : ''}`}
      onSubmit={this.signup}
      noValidate>

        <input
          type='text'
          ref='fname'
          required
          placeholder='نام' />

        <input
          type='text'
          ref='lname'
          required
          placeholder='نام خانوادگی' />

        <input
          type='email'
          ref='email'
          required
          placeholder='ایمیل' />

        <input
          type='password'
          ref='password'
          required
          placeholder='رمز' />

        <button>ثبت نام</button>

      </form>
    );
  }
}

export default Form;
