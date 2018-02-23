import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class ProtectedRoute extends Component {
  render() {
    if (this.props.logged) {
      return <Route {...this.props} />;
    }

    return <Redirect to='/login' />;
  }
}

export default connect(
  state => ({ logged: state.user.logged })
)(ProtectedRoute);
