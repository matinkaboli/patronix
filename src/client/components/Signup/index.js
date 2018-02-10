import React, { Component } from 'react';
import bind from 'Root/bind';
import socket from 'Root/socket';

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

        <button onClick={this.signup}>ثبت نام</button>

      </div>
    );
  }
}

export default Signup;
