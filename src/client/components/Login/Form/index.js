import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import izitoast from 'izitoast';

import bind from 'Root/bind';
import loginAct from 'Root/actions/login';
import { email } from 'Libs/validator';
import styles from './index.less';

class Form extends Component {
  constructor() {
    super();
    this.state = {};
  }

  @bind
  login(e) {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      this.setState({ displayValidateError: true });
      return;
    }
    this.setState({ displayValidateError: false });

    if (email(this.refs.email.value)) {
      this.props.dispatch(loginAct({
        email: this.refs.email.value,
        password: this.refs.password.value,
        push: this.props.history.push,
        failure() {
          izitoast.error({
            rtl: true,
            title: 'ایمیل یا رمز اشتباه وارد شده است'
          });
        }
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
    const { displayValidateError } = this.state;

    return (
      <form
        className={`${styles.form}
        ${displayValidateError ? 'displayValidateError' : ''}`}
        onSubmit={this.login}
        noValidate>

        <input
          type='email'
          ref='email'
          required
          placeholder='ایمیل'/>

        <input
          type='password'
          ref='password'
          required
          placeholder='رمز' />

          <button type='submit'>ورود</button>

      </form>
    );
  }
}

export default withRouter(connect()(Form));
