import React, { Component } from 'react';
import izitoast from 'izitoast';

import inviteOperator from 'Root/actions/user/site/operator/invite';

import { email } from 'Root/js/validator';
import bind from 'Root/js/bind';

import Field from 'Root/components/Panel/Field';
import Button from 'Root/components/Button';
import Input from 'Root/components/Input';

export default class extends Component {
  @bind
  newOperator() {
    let input = this.refs.input.refs.input.value;

    if (!input) {
      izitoast.warning({
        rtl: true,
        title: 'مقادیر کافی نیستند'
      });

      return;
    }

    if (!email(input)) {
      izitoast.error({
        rtl: true,
        title: 'ایمیل صحیح نمیباشد'
      });

      return;
    }

    inviteOperator(this.props.id, input);

    input = '';
  }

  render() {
    return (
      <Field>
        <div>
          <Input
            ref='input'
            type='email'
            placeholder='ایمیل پشتیبان'
          />
        </div>

        <div>
          <Button
            color='blue'
            handleClick={this.newOperator}>
            اضافه کردن
          </Button>
        </div>
      </Field>
    );
  }
}
