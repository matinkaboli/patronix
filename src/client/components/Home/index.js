import React, { Component } from 'react';
import izitoast from 'izitoast';
import { Link } from 'react-router-dom';

import bind from 'Root/bind';
import loginAct from 'Root/actions/login';
import Menu from 'Root/components/Menu';
import { email, password } from 'Root/libs/validator';

class Home extends Component {
  @bind
  login() {
    if (email(this.refs.email.value)) {
      if (password(this.refs.password.value)) {
        this.props.dispatch(loginAct({
          email: this.refs.email.value,
          password: this.refs.password.value,
          push: this.props.history.push
        }));
      } else {
        izitoast.warning({
          rtl: true,
          title: 'رمز باید حداقل هشت رقم باشد'
        });
        this.refs.password.focus();
      }
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
      </div>
    );
  }
}

export default Home;
