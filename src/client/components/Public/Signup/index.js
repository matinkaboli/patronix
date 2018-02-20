import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Form from 'Root/components/Form';
import bind from 'Root/bind';
import signup from 'Root/actions/signup';
import captcha from 'Root/actions/captcha';
import styles from './index.less';


class Signup extends Component {
  @bind
  signup(e) {
    signup({
      name: {
        first: e.target.fname.value,
        last: e.target.lname.value
      },
      email: e.target.email.value,
      password: e.target.password.value
    }, e.target.captcha.value);
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
          name: 'fname',
          placeholder: 'نام',
          required: true
        }
      },
      {
        tag: 'input',
        attrs: {
          type: 'text',
          name: 'lname',
          placeholder: 'نام خانوادگی',
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
      <div className={styles.formContainer}>

        <h1>ثبت نام</h1>
        
        <Form
          inputs={inputs}
          submitFunction={this.signup} />

        <Link to='/login'>حساب داری؟</Link>
      </div>
    );
  }
}

export default connect(state => ({ captcha: state.captcha }))(Signup);
