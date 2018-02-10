import React, { Component } from 'react';
import { connect } from 'react-redux';
import bind from 'Root/bind';
import loginAct from 'Root/actions/login';
import './index.less';

class Login extends Component {
  @bind
  login() {
    this.props.dispatch(loginAct({
      email: this.refs.email.value,
      password: this.refs.password.value,
      push: this.props.history.push
    }));
  }

  render() {
    return (
      <div>

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

export default connect()(Login);
