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
    let bio = this.refs.textarea.refs.textarea.value;
    if (!bio) {
      izitoast.warning({
        rtl: 'true',
        title: 'مقادیر کافی نمیباشند'
      });

      return;
    }

    this.props.dispatch(updateBio(bio));
  }

  render() {
    return (
      <Field>
        <div>
          <p>درباره</p>

          <TextArea
            placeholder='درباره'
            defaultValue={this.props.bio}
            ref='textarea'
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
