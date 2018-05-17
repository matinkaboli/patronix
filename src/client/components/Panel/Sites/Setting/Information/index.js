import React, { Component } from 'react';
import izitoast from 'izitoast';

import updateInformation from 'Root/actions/user/site/information';

import bind from 'Root/js/bind';

import Field from 'Root/components/Panel/Field';
import Button from 'Root/components/Button';


class Information extends Component {
  @bind
  updateInformation() {
    if (!this.refs.information.value) {
      izitoast.warning({
        rtl: true,
        title: 'مقدار کافی نمی باشد.'
      });

      return;
    }

    this.props.dispatch(updateInformation(this.refs.information.value));
  }

  render() {
    return (
      <Field>
        <div>
          <input
            ref='information'
            type='text'
            maxLength='500'
            placeholder='درباره سایت'
            defaultValue={this.props.information}
          />
        </div>

        <div>
          <Button
            color='blue'
            handleClick={this.updateInformation}>
            به روز رسانی
          </Button>
        </div>
      </Field>
    );
  }
}

export default Information;
