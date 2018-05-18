import React, { Component } from 'react';
import izitoast from 'izitoast';

import updateName from 'Root/actions/user/site/name';

import bind from 'Root/js/bind';

import Field from 'Root/components/Panel/Field';
import Button from 'Root/components/Button';
import Input from 'Root/components/Input';

export default class extends Component {
  @bind
  updateName() {
    if (!this.input.value) {
      izitoast.warning({
        rtl: true,
        title: 'مقادیر کافی نیستند'
      });

      return;
    }

    updateName(this.props.id, this.input.value);
  }

  render() {
    return (
      <Field>
        <div>
          <Input
            type='text'
            placeholder='نام سایت'
            defaultValue={this.props.name}
            Ref={el => { this.input = el; }}
          />
        </div>

        <div>
          <Button color='blue' handleClick={this.updateName}>
            به روز رسانی
          </Button>
        </div>
      </Field>
    );
  }
}
