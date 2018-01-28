import React, { Component } from 'react';
import bind from 'Client/bind';
import socket from 'Client/socket';

class Signup extends Component {
  @bind
  signup() {
    socket.once('signup', res => {
      console.log(res);
    });

    socket.emit('signup', {
      name: {
        first: this.refs.fname.value,
        last: this.refs.lname.value
      },
      email: this.refs.email.value,
      password: this.refs.password.value
    });
  }

  render() {
    return (
      <div>
        <input type='text' ref='fname' />
        <input type='text' ref='lname' />
        <input type='text' ref='email' />
        <input type='password' ref='password' />
        <button onClick={this.signup}>signup</button>
      </div>
    );
  }
}

export default Signup;
