import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import izitoast from 'izitoast';

import { email } from 'Root/js/validator';
import bind from 'Root/js/bind';
import loginAct from 'Root/actions/user/login';
import Form from 'Root/components/Form';
import captcha from 'Root/actions/captcha';

class Login extends Component {
  @bind
  login(refs) {
    if (!email(refs.email.value)) {
      izitoast.warning({
        rtl: true,
        title: 'ایمیل اشتباه است'
      });
      refs.email.focus();
      return;
    }

    if (this.props.attempt >= 1) {
      this.props.dispatch(loginAct({
        email: refs.email.value,
        password: refs.password.value
      }, this.props.history.push, refs.captcha.value));
      return;
    }

    this.props.dispatch(loginAct({
      email: refs.email.value,
      password: refs.password.value
    }, this.props.history.push));
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

    if (this.props.attempt >= 1) {
      inputs.splice(2, 0, {
        tag: 'div',
        attrs: {
          dangerouslySetInnerHTML: {
            __html: this.props.captcha
          }
        }
      }, {
        tag: 'i',
        attrs: {
          className: 'icon icon-refresh',
          onClick: captcha
        }
      }, {
        tag: 'input',
        attrs: {
          type: 'text',
          placeholder: 'کد امنیتی',
          required: true,
          name: 'captcha'
        }
      });
    }

    return (
      <div>
        <Form
          inputs={inputs}
          submitFunction={this.login}>
          <h1>ورود</h1>
        </Form>

        <div>
          <Link to='/signup'>ثبت نام</Link>
        </div>
        <div>
          <Link to='/recovery'>رمزت رو فراموش کردی؟</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(
  connect(state => ({
    captcha: state.captcha,
    attempt: state.attempt
  }))(Login)
);
