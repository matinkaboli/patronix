import React, { Component } from 'react';
import izitoast from 'izitoast';
import { Link } from 'react-router-dom';

import bind from 'Root/bind';
import loginAct from 'Root/actions/login';
import Menu from './Menu';
import { email, password } from 'Libs/validator';

class Home extends Component {
  @bind
  login() {
    if (email(this.refs.email.value) && password(this.refs.password.value)) {
      this.props.dispatch(loginAct({
        email: this.refs.email.value,
        password: this.refs.password.value,
        push: this.props.history.push
      }));
    } else {
      izitoast.warning({
        rtl: true,
        title: 'ایمیل اشتباه است'
      });
      this.refs.email.focus();
    }
  }

  render() {
    return (
      <div>
        <Menu />
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

          <Link to='/signup'>ثبت نام</Link>
          <Link to='/recovery'>رمزت رو فراموش کردی؟</Link>

        </div>

      </div>
    );
  }
}

export default Home;
