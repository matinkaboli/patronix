import React, { Component } from 'react';
import izitoast from 'izitoast';
import { withRouter, matchPath } from 'react-router-dom';

import recover from 'Root/actions/recovery/recover';

import bind from 'Root/js/bind';
import lazy from 'Root/js/lazy';

import Form from 'Root/components/Form';


class Code extends Component {
  @bind
  recover(refs) {
    if (refs.pass1.value === refs.pass2.value) {
      recover(
        refs.pass1.value,
        this.props.history.push,
        matchPath(this.props.location.pathname, {
          path: '/recovery/:code'
        }).params.code
      );
    }

    else {
      izitoast.warning({
        rtl: true,
        title: 'رمز ها مطابقت ندارند'
      });
    }
  }

  render() {
    const inputs = [
      {
        tag: 'input',
        attrs: {
          type: 'password',
          placeholder: 'رمز عبور جدید',
          required: true,
          name: 'pass1'
        }
      },
      {
        tag: 'input',
        attrs: {
          type: 'password',
          placeholder: 'تکرار رمز عبور',
          required: true,
          name: 'pass2'
        }
      },
      {
        tag: 'button',
        html: 'تغییر رمز عبور',
        attrs: {
          type: 'submit'
        }
      }
    ];

    return (
      <div>

        <Form
          inputs={inputs}
          submitValue='تغییر رمز'
          submitFunction={this.recover}>
          <h1>تغییر رمز عبور</h1>
        </Form>
      </div>
    );
  }
}

export default lazy(
  withRouter(Code),
  ({ params }) =>
  `query {
    rl(code: "${params.code}") {
      status
    }
  }`,
  'temp'
);
