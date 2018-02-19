import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Code extends Component {
  render() {
    // If the code is right
    if (true) {
      return <h1>Done</h1>;
    }

    localStorage.setItem('recovery_wrong_code', 1);

    return <Redirect to='/' />;
  }
}

export default Code;
