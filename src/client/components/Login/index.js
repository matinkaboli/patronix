import React, { Component } from 'react';
import bind from 'Root/bind';
import socket from 'Root/socket';

class Login extends Component {
  @bind
  login() {
    socket.emit('login', {
      email: this.refs.email.value,
      password: this.refs.password.value
    });

    socket.once('login', (res, token) => {
      console.log(res, token);
    });
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

export default Login;
