import React, { Component } from 'react';
import izitoast from 'izitoast';

import updateName from 'Root/actions/user/site/name';

import bind from 'Root/js/bind';

import Field from 'Root/components/Panel/Field';
import Button from 'Root/components/Button';

export default class extends Component {
  @bind
  updateName() {
    if (!this.refs.name.value) {
      izitoast.warning({
        rtl: true,
        title: 'مقادیر کافی نیستند'
      });
      return;
    }

    updateName(this.props.id, this.refs.name.value);
  }

  render() {
    return (
      <Field>
        <div>
          <input
            type='text'
            ref='name'
            placeholder='نام سایت'
            defaultValue={this.props.name}
          />
        </div>

        <div>
          <Button
            color='blue'
            handleClick={this.updateName}>
            به روز رسانی
          </Button>
        </div>
      </Field>
    );
  }
}
