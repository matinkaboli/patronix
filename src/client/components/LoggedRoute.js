import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';


class LoggedRoute extends Component {
  render() {
    return this.props.logged ?
    <Redirect to='/panel' /> :
    <Route {...this.props} />;
  }
}

export default connect(state => ({ logged: state.user.logged }))(LoggedRoute);
