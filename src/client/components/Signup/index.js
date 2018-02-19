import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Menu from 'Root/components/Menu';
import bind from 'Root/bind';
import signup from 'Root/actions/signup';
import captcha from 'Root/actions/captcha';
import styles from './index.less';

class Signup extends Component {
  @bind
  signup() {
    signup({
      name: {
        first: this.refs.fname.value,
        last: this.refs.lname.value
      },
      email: this.refs.email.value,
      password: this.refs.password.value
    }, this.refs.captcha.value);
  }

  componentDidMount() {
    captcha();
  }

  render() {
    return (
      <div>
        <Menu />
        <div className={styles.formContainer}>
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

          <div dangerouslySetInnerHTML={{
            __html: this.props.captcha
          }} />

          <input
            type='text'
            ref='captcha'
            placeholder='captcha' />

          <button onClick={this.signup}>ثبت نام</button>
          <Link to='/login'>حساب داری؟</Link>
        </div>
      </div>
    );
  }
}

export default connect(state => ({ captcha: state.captcha }))(Signup);
