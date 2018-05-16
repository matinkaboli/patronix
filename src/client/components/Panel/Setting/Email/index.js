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
    if (
      !email(this.email.value) ||
      !this.email.value ||
      !this.pass.value) {

      izitoast.warning({
        rtl: true,
        title: 'مقادیر صحیح نمیباشند'
      });
      return;
    }

    const { dispatch } = this.props;

    dispatch(updateEmail({
      email: this.email.value,
      password: this.pass.value
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
            Ref={el => { this.email = el; }}
            defaultValue={this.props.email}
          />

          <Input
            type='password'
            placeholder='رمز عبور'
            Ref={el => { this.pass = el; }}
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
