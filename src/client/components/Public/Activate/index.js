import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import lazy from 'Root/lazy';

class Activate extends Component {
  render() {
    return <Redirect to='/login' />;
  }
}

export default lazy({
  component: Activate
});
