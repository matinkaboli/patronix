import React, { Component } from 'react';
import { connect } from 'react-redux';
import izitoast from 'izitoast';

import updateName from 'Root/actions/user/name';

import bind from 'Root/js/bind';

import Field from 'Root/components/Panel/Field';
import Button from 'Root/components/Button';
import Input from 'Root/components/Input';


class Name extends Component {
  @bind
  updateName() {
    if (!this.input.value) {
      izitoast.warning({
        rtl: 'true',
        title: 'مقادیر کافی نمیباشند'
      });

      return;
    }

    this.props.dispatch(updateName(this.input.value));
  }

  render() {
    return (
      <Field>
        <div>
          <p>نام</p>

          <Input
            type='text'
            placeholder='نام'
            defaultValue={this.props.name}
            Ref={el => { this.input = el; }}
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

export default connect(
  state => ({
    name: state.user.name
  })
)(Name);
