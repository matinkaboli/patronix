import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import lazy from 'Root/js/lazy';

class Activate extends Component {
  render() {
    return <Redirect to='/login' />;
  }
}

export default lazy(
  Activate
);
