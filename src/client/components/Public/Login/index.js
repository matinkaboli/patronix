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
  state = {
    attempt: 0,
    inputs: [
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
    ]
  };

  @bind
  login(refs) {
    this.setState(prev => ({ attempt: prev.attempt + 1 }));
    if (this.props.captcha && this.state.attempt === 1) {

      this.setState(prev => {
        const inputs = prev.inputs;

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

        return { inputs };
      });
    }

    if (!email(refs.email.value)) {
      izitoast.warning({
        rtl: true,
        title: 'ایمیل اشتباه است'
      });
      refs.email.focus();
      return;
    }

    if (this.props.captcha) {
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
    return (
      <div>
        <Form
          inputs={this.state.inputs}
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
  connect(state => ({ captcha: state.captcha }))(Login)
);
