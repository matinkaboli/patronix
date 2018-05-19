import React, { Component } from 'react';
import izitoast from 'izitoast';

import updateInformation from 'Root/actions/user/site/information';

import bind from 'Root/js/bind';

import Field from 'Root/components/Panel/Field';
import TextArea from 'Root/components/TextArea';
import Button from 'Root/components/Button';


export default class extends Component {
  @bind
  updateInformation() {
    let info = this.refs.textarea.refs.textarea.value;
    if (!info) {
      izitoast.warning({
        rtl: true,
        title: 'مقدار کافی نمی باشد.'
      });

      return;
    }

    updateInformation(this.props.id, info);
  }

  render() {
    return (
      <Field>
        <div>
          <TextArea
            maxLength='500'
            placeholder='درباره سایت'
            ref='textarea'
            defaultValue={this.props.information}
          />
        </div>

        <div>
          <Button color='blue' handleClick={this.updateInformation}>
            به روز رسانی
          </Button>
        </div>
      </Field>
    );
  }
}
