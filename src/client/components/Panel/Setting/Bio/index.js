import React, { Component } from 'react';
import { connect } from 'react-redux';
import izitoast from 'izitoast';

import updateBio from 'Root/actions/user/bio';

import bind from 'Root/js/bind';

import Field from 'Root/components/Panel/Field';
import TextArea from 'Root/components/TextArea';
import Button from 'Root/components/Button';


class Bio extends Component {
  @bind
  updateBio() {
    if (!this.input.value) {
      izitoast.warning({
        rtl: 'true',
        title: 'مقادیر کافی نمیباشند'
      });

      return;
    }

    this.props.dispatch(updateBio(this.input.value));
  }

  render() {
    return (
      <Field>
        <div>
          <TextArea
            placeholder='درباره'
            defaultValue={this.props.bio}
            Ref={el => { this.input = el; }}
          />
        </div>

        <div>
          <Button color='blue' handleClick={this.updateBio}>
            به روز رسانی
          </Button>
        </div>
      </Field>
    );
  }
}

export default connect(
  state => ({
    bio: state.user.bio
  })
)(Bio);
