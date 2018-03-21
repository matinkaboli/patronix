import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import recovery from 'Root/actions/recovery/recovery';

import bind from 'Root/js/bind';

import Form from 'Root/components/Form';


class Index extends Component {
  @bind
  recovery(refs) {
    recovery(refs.email.value);
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
      },
      {
        tag: 'button',
        html: 'بازیابی رمز عبور',
        attrs: {
          type: 'submit'
        }
      }
    ];

    return (
      <div>

        <Form
          inputs={inputs}
          submitFunction={this.recovery}>
          <h1>بازیابی رمز عبور</h1>
        </Form>

        <Link to='/login'>وارد شو</Link>
      </div>
    );
  }
}

export default Index;
