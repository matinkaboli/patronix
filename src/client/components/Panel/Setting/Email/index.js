import React, { Component } from 'react';
import { connect } from 'react-redux';
import izitoast from 'izitoast';

import updateEmail from 'Root/actions/user/email';

import bind from 'Root/js/bind';
import { email } from 'Root/js/validator';

import Field from 'Root/components/Panel/Field';
import Button from 'Root/components/Button';
import Input from 'Root/components/Input';


class Email extends Component {
  @bind
  updateEmail() {
    let emailValue = this.refs.email.refs.input.value;
    let pass = this.refs.password.refs.input.value;
    if (
      !email(emailValue) ||
      !emailValue ||
      !pass) {

      izitoast.warning({
        rtl: true,
        title: 'مقادیر صحیح نمیباشند'
      });
      return;
    }

    const { dispatch } = this.props;

    dispatch(updateEmail({
      email: emailValue,
      password: pass
    }));
  }

  render() {
    return (
      <Field>
        <div>
          <p>ایمیل</p>
          <Input
            type='email'
            placeholder='ایمیل'
            ref='email'
            defaultValue={this.props.email}
          />

          <Input
            type='password'
            placeholder='رمز عبور'
            ref='password'
          />
        </div>

        <div>
          <Button
            color='blue'
            handleClick={this.updateEmail}>
            به روز رسانی
          </Button>
        </div>
      </Field>
    );
  }
}

export default connect(
  state => ({
    email: state.user.email
  })
)(Email);
