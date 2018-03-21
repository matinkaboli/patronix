import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


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
