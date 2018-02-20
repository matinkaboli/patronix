import React, { Component } from 'react';

import bind from 'Root/bind';
import recovery from 'Root/actions/recovery/recovery';
import Form from 'Root/components/Form';

class Index extends Component {
  @bind
  recovery(e) {
    recovery(e.target.email.value);
  }

  render() {
    const inputs = [
      {
        tag: 'input',
        attrs: {
          type: 'email',
          placeholder: 'ایمیل',
          name: 'email',
          required: true
        }
      }
    ];

    return (
      <div>

        <Form
          inputs={inputs}
          submitValue='بازیابی رمز عبور'
          submitFunction={this.recovery} />

      </div>
    );
  }
}

export default Index;
