import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import izitoast from 'izitoast';

import lazy from 'Root/js/lazy';


class Activate extends Component {
  render() {
    izitoast.success({
      rtl: true,
      title: 'حساب شما با موفقیت تایید شد'
    });

    return <Redirect to='/login' />;
  }
}

export default lazy(
  Activate,
  'temp'
);
