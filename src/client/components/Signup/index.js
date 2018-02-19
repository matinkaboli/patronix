import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Menu from 'Root/components/Menu';
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
        type: 'text',
        name: 'fname',
        placeholder: 'نام',
        required: true
      },
      {
        type: 'text',
        name: 'lname',
        placeholder: 'نام خانوادگی',
        required: true
      },
      {
        type: 'email',
        name: 'email',
        placeholder: 'ایمیل',
        required: true
      },
      {
        type: 'password',
        name: 'password',
        placeholder: 'رمز عبور',
        required: true
      },
      {
        type: 'text',
        name: 'captcha',
        placeholder: 'کد امنیتی',
        required: true
      }
    ];

    return (
      <div>
        <Menu />
        <div className={styles.formContainer}>

          <Form
            inputs={inputs}
            submitValue='ثبت نام'
            submitFunction={this.signup} />

            <div dangerouslySetInnerHTML={{
              __html: this.props.captcha
            }} />

          <Link to='/login'>حساب داری؟</Link>
        </div>
      </div>
    );
  }
}

export default connect(state => ({ captcha: state.captcha }))(Signup);
