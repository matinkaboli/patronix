import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import cacheLoad from 'Root/actions/lazy/cacheLoad';
import tempLoad from 'Root/actions/lazy/tempLoad';

class Prototype extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['cache', 'temp']).isRequired,
    // you should pass a component
    component: PropTypes.func.isRequired,
    actionType: PropTypes.string
  }

  state = {
    loading: true
  }

  componentDidMount() {
    if (this.props.type === 'cache') {
      return this.props.dispatch(
        cacheLoad(
          this.props.match,
          this.props.query,
          this.props.type,
          this.setState.bind(this)
        )
      );
    }

    this.props.dispatch(
      tempLoad(
        this.props.query,
        this.setState.bind(this)
      )
    );
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

export default (component, query, type, actionType) => () =>
  <Lazy
    component={component}
    type={type}
    actionType={actionType}
    query={query} />;
