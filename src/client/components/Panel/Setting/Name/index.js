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
    let name = this.refs.name.refs.input.value;
    if (!name) {
      izitoast.warning({
        rtl: 'true',
        title: 'مقادیر کافی نمیباشند'
      });

      return;
    }

    this.props.dispatch(updateName(name));
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
            ref='name'
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
