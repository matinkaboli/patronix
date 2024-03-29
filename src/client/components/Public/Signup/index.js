import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import izitoast from 'izitoast';

import captcha from 'Root/actions/captcha';
import signup from 'Root/actions/signup';

import { email } from 'Root/js/validator';
import bind from 'Root/js/bind';

import Form from 'Root/components/Form';


class Signup extends Component {
  @bind
  signup(refs) {
    if (!email(refs.email.value)) {
      izitoast.warning({
        rtl: true,
        title: 'ایمیل صحیح نمیباشد'
      });
      return;
    }

    signup({
      name: refs.name.value,
      email: refs.email.value,
      password: refs.password.value
    }, refs.captcha.value, this.props.history.push);
  }

  componentDidMount() {
    captcha();
  }

  render() {
    const inputs = [
      {
        tag: 'input',
        attrs: {
          type: 'text',
          name: 'name',
          placeholder: 'نام',
          required: true
        }
      },
      {
        tag: 'input',
        attrs: {
          type: 'email',
          name: 'email',
          placeholder: 'ایمیل',
          required: true
        }
      },
      {
        tag: 'input',
        attrs: {
          type: 'password',
          name: 'password',
          placeholder: 'رمز عبور',
          required: true
        }
      },
      {
        tag: 'div',
        attrs: {
          dangerouslySetInnerHTML: {
            __html: this.props.captcha
          }
        }
      },
      {
        tag: 'i',
        attrs: {
          className: 'icon icon-refresh',
          onClick: captcha
        }
      },
      {
        tag: 'input',
        attrs: {
          type: 'text',
          name: 'captcha',
          placeholder: 'کد امنیتی',
          required: true
        }
      },
      {
        tag: 'button',
        html: 'ثبت نام',
        attrs: {
          type: 'submit'
        }
      }
    ];

    return (
      <div>

        <Form
          inputs={inputs}
          submitFunction={this.signup}>
          <h1>ثبت نام</h1>
        </Form>

        <Link to='/login'>حساب داری؟ وارد شو</Link>
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({ captcha: state.captcha })
  )(Signup)
);
