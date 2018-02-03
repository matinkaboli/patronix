import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Denied from 'Components/Denied';

class ProtectedRoute extends Component {
  render() {
    if (this.props.logged) {
      return (
        <Route path={this.props.path}>
          {this.props.children}
        </Route>
      );
    }
    return <Denied />;
  }
}

export default connect(
  state => ({ logged: state.user.logged })
)(ProtectedRoute);
