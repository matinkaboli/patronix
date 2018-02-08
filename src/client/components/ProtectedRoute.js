import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class ProtectedRoute extends Component {
  componentWillMount() {
    if (!this.props.logged) {
      this.props.history.push('/denied');
    }
  }

  render() {
    return (
      <Route {...this.props} />
    );
  }
}

export default withRouter(connect(
  state => ({ logged: state.user.logged })
)(ProtectedRoute));
