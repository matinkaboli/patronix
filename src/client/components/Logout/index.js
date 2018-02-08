import React, { Component } from 'react';
import { connect } from 'react-redux';
import types from 'Root/actions';

class Logout extends Component {
  componentDidMount() {
    this.props.dispatch({ type: types.LOGOUT });
    localStorage.token = '';
  }

  render() {
    return null;
  }
}

export default connect()(Logout);
