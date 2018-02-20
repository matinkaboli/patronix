import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import izitoast from 'izitoast';

import { email } from 'Root/js/validator';

import bind from 'Root/bind';
import loginAct from 'Root/actions/login';

import Form from 'Root/components/Form';

import styles from './index.less';

class Login extends Component {
  @bind
  login(e) {

    if (email(e.target.email.value)) {
      this.props.dispatch(loginAct({
        email: e.target.email.value,
        password: e.target.password.value,
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
      e.target.email.focus();
    }
  }

  render() {
    const inputs = [
      {
        tag: 'input',
        attrs: {
          type: 'email',
          placeholder: 'ایمیل',
          required: true,
          name: 'email'
        }
      },
      {
        tag: 'input',
        attrs: {
          type: 'password',
          placeholder: 'رمز عبور',
          required: true,
          name: 'password'
        }
      },
      {
        tag: 'button',
        html: 'ورود',
        attrs: {
          type: 'submit'
        }
      }
    ];

    return (
      <div className={styles.formContainer}>

        <h1>ورود</h1>

        <Form
          inputs={inputs}
          submitFunction={this.login} />

        <Link to='/signup'>ثبت نام</Link>

        <Link to='/recovery'>رمزت رو فراموش کردی؟</Link>
      </div>
    );
  }
}

export default withRouter(connect()(Login));
