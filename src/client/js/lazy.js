import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import izitoast from 'izitoast';

import cache from 'Root/actions/lazy/cache';
import temp from 'Root/actions/lazy/temp';
import conditional from 'Root/actions/lazy/conditional';

class Prototype extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['cache', 'temp', 'conditional']).isRequired,
    // you should pass a component
    component: PropTypes.func.isRequired,
    actionType: PropTypes.func
  }

  state = {
    loading: true
  }

  componentDidMount() {
    let query;
    if (typeof this.props.query === 'function') {
      query = this.props.query(this.props.match);
    }

    if (this.props.type === 'condition') {
      return this.props.dispatch(
        conditional(
          this.props.match,
          query,
          this.setState.bind(this)
        )
      );
    }

    if (this.props.type === 'cache') {
      return this.props.dispatch(
        cache(
          this.props.match,
          query,
          this.props.action,
          this.setState.bind(this)
        )
      );
    }

    this.props.dispatch(
      temp(
        query,
        this.setState.bind(this)
      )
    );
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    if (this.props.lazy.status === 'success') {
      if (['temp', 'conditional'].includes(this.props.type)) {
        return <this.props.component data={this.props.lazy.data}/>;
      }

      return <this.props.component />;
    }

    if (this.props.lazy.status === 'notfound') {
      return <Redirect to='/notfound' />;
    }

    if (this.props.lazy.status === 'unauth') {
      return <Redirect to='/denied' />;
    }

    if (this.props.lazy.status === 'error') {
      izitoast.error({
        rtl: true,
        title: 'خطایی رخ داد'
      });
    }

    return null;
  }
}

const Lazy = withRouter(connect(
  state => ({ lazy: state.lazy })
)(Prototype));

export default (component, query, type, action) => () =>
  <Lazy
    component={component}
    type={type}
    action={action}
    query={query} />;
