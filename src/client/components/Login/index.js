import React, { Component } from 'react';
import { connect } from 'react-redux';
import bind from 'Root/bind';
import loginAct from 'Root/actions/login';

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
        <input type='text' ref='email' />
        <input type='password' ref='password' />
        <button onClick={this.login}>
          login
        </button>
      </div>
    );
  }
}

export default connect()(Login);
