import React, { Component } from 'react';
import izitoast from 'izitoast';

import inviteOperator from 'Root/actions/user/site/operator/invite';

import { email } from 'Root/js/validator';
import bind from 'Root/js/bind';

import Field from 'Root/components/Panel/Field';
import Button from 'Root/components/Button';

class Invite extends Component {
  @bind
  newOperator() {
    if (!this.refs.newOperator.value) {
      izitoast.warning({
        rtl: true,
        title: 'مقادیر کافی نیستند'
      });
      return;
    }

    if (!email(this.refs.newOperator.value)) {
      izitoast.error({
        rtl: true,
        title: 'ایمیل صحیح نمیباشد'
      });
      return;
    }

    inviteOperator(this.refs.newOperator.value);

    this.refs.newOperator.value = '';
  }

  render() {
    return (
      <Field>
        <div>
          <input
            type='email'
            ref='newOperator'
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


export default Invite;
