import React, { Component } from 'react';
import bind from 'Root/bind';
import socket from 'Root/socket';
import store from 'Root/store';
import { LOGIN } from 'Root/actions';

class Login extends Component {
  @bind
  login() {
    const { push } = this.props.history;

    socket.emit('login', {
      email: this.refs.email.value,
      password: this.refs.password.value
    });

    socket.once('login', (res, data) => {
      localStorage.token = data.token;

      store.dispatch({
        type: LOGIN,
        name: data.name,
        email: data.email
      });

      push('/u');
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
