import React, { Component } from 'react';
import izitoast from 'izitoast';

import updatePass from 'Root/actions/user/pass';

import bind from 'Root/js/bind';

import Field from 'Root/components/Panel/Field';
import Button from 'Root/components/Button';
import Input from 'Root/components/Input';


export default class extends Component {
  @bind
  updatePass() {
    let old = this.refs.old.refs.input.value;
    let fresh = this.refs.fresh.refs.input.value;
    if (!old || !fresh) {
      izitoast.warning({
        rtl: true,
        title: 'مقادیر کافی نیست'
      });

      return;
    }

    updatePass({
      old,
      fresh
    });
  }

  render() {
    return (
      <Field>
        <div>
          <p>ایمیل</p>

          <Input
            type='password'
            placeholder='رمز کنونی'
            ref='old'
          />

          <Input
            type='password'
            placeholder='رمز جدید'
            ref='fresh'
          />
        </div>

        <div>
          <Button
            color='blue'
            handleClick={this.updatePass}>
            به روز رسانی
          </Button>
        </div>
      </Field>
    );
  }
}
