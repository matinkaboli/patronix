import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import load from 'Root/actions/lazy/load';

class LazyRoute extends Component {
  static propTypes = {
    type: PropTypes.string,
    // you should pass a component
    component: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.dispatch(load({
      path: this.props.computedMatch.path,
      params: this.props.computedMatch.params,
      type: this.props.type
    }));
  }

  render() {
    if (!this.props.lazy.loading && this.props.lazy.status === 200) {
      return <Route {...this.props} />;
    }

    if (!this.props.lazy.loading && this.props.lazy.status === 404) {
      return <Redirect to='/notfound' />;
    }

    return null;
  }
}

export default connect(state => ({ lazy: state.lazy }))(LazyRoute);
