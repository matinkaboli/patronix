import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import izitoast from 'izitoast';

import bind from 'Root/bind';
import loginAct from 'Root/actions/login';
import { email } from 'Libs/validator';
import styles from './index.less';

class Form extends Component {
  @bind
  login() {
    if (email(this.refs.email.value)) {
      this.props.dispatch(loginAct({
        email: this.refs.email.value,
        password: this.refs.password.value,
        push: this.props.history.push,
        failure() {
          izitoast.error({
            rtl: true,
            title: 'ایمیل یا رمز اشبتاه وارد شده است'
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

      </div>
    );
  }
}

export default withRouter(connect()(Form));
