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
    if (!this.input.value) {
      izitoast.warning({
        rtl: true,
        title: 'مقادیر کافی نیستند'
      });
      return;
    }

    if (!email(this.input.value)) {
      izitoast.error({
        rtl: true,
        title: 'ایمیل صحیح نمیباشد'
      });
      return;
    }

    inviteOperator(this.props.id, this.input.value);

    this.input.value = '';
  }

  render() {
    return (
      <Field>
        <div>
          <Input
            type='email'
            placeholder='ایمیل پشتیبان'
            Ref={el => { this.input = el; }}
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
