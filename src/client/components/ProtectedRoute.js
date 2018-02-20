import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';

class ProtectedRoute extends Component {
  render() {
    if (this.props.logged) {
      return <Route {...this.props} />;
    }

    return <Redirect to='/login' />;
  }
}

export default withRouter(connect(
  state => ({ logged: state.user.logged })
)(ProtectedRoute));
