import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import load from 'Root/actions/lazy/load';

class Prototype extends Component {
  static propTypes = {
    type: PropTypes.string,
    // you should pass a component
    component: PropTypes.func.isRequired
  }

  state = {
    loading: true
  }

  componentDidMount() {
    this.props.dispatch(load({
      path: this.props.match.path,
      params: this.props.match.params
    }, this.props.type, this.setState.bind(this)));
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    if (this.props.lazy.status === 200) {
      return <this.props.component />;
    }

    if (this.props.lazy.status === 404) {
      return <Redirect to='/notfound' />;
    }

    if (this.props.lazy.status === 403) {
      return <Redirect to='/denied' />;
    }

    return null;
  }
}

const Lazy = withRouter(connect(
  state => ({ lazy: state.lazy })
)(Prototype));

export default (component, type) => () =>
  <Lazy component={component} type={type} />;
