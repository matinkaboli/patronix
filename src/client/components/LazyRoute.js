import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router';
import { connect } from 'react-redux';
import lazyLoad from 'Root/actions/lazyLoad';
import ResponseHandler from 'Libs/ResponseHandler';

class LazyRoute extends Component {
  componentDidMount() {
    this.props.dispatch(lazyLoad({
      path: this.props.computedMatch.path,
      params: this.props.computedMatch.params
    }));
  }

  render() {
    if (this.props.lazy.loading) {
      return null;
    }

    let handler = new ResponseHandler();

    return handler
    .handle('success', () =>
      <this.props.component data={this.props.lazy.data} />
    )

    .handle('error', () => <Redirect to='/denied' />)

    .status(this.props.lazy.status);
  }
}

export default withRouter(connect(state => ({ lazy: state.lazy }))(LazyRoute));
