import React, { Component } from 'react';
import { connect } from 'react-redux';

import lazy from 'Root/js/lazy';
import types from 'Root/actions';

class Site extends Component {
  render() {
    return <p>{this.props.sites.name}</p>;
  }
}

export default lazy(
  connect(
    state => ({
      sites: state.sites.site
    })
  )(Site),
  types.sites.LOAD
);
