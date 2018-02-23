import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Activate extends Component {
  render() {
    localStorage.setItem('activationSuccessful', 1);
    return <Redirect to='/login' />;
  }
}

export default Activate;
