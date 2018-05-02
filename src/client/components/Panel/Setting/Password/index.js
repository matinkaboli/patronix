import React, { Component } from 'react';
import izitoast from 'izitoast';

import bind from 'Root/js/bind';

import updatePass from 'Root/actions/user/pass';

import Field from 'Root/components/Panel/Field';
import Button from 'Root/components/Button';
import Input from 'Root/components/Input';

class Password extends Component {
  @bind
  updatePass() {
    if (!this.old.value || !this.fresh.value) {
      izitoast.warning({
        rtl: true,
        title: 'مقادیر کافی نیست'
      });

      return;
    }

    updatePass({
      old: this.old.value,
      fresh: this.fresh.value
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
            Ref={el => { this.old = el; }}
          />

          <Input
            type='password'
            placeholder='رمز جدید'
            Ref={el => { this.fresh = el; }}
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

export default Password;
