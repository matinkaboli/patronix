import React, { Component } from 'react';
import { connect } from 'react-redux';
import izitoast from 'izitoast';
import { Link } from 'react-router-dom';

import bind from 'Root/bind';
import loginAct from 'Root/actions/login';
import Menu from '../Menu/index';
import { e } from 'Root/libs/validator';

class Home extends Component {
  @bind
  login() {
    if (e(this.refs.email.value)) {
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

export default connect()(Home);
