import React, { Component } from 'react';
import { connect } from 'react-redux';
import lazyLoad from 'Root/actions/lazyLoad';

class LazyRoute extends Component {
  componentDidMount() {
    this.props.dispatch(lazyLoad({
      path: this.props.computedMatch.path,
      params: this.props.computedMatch.params
    }));
  }

  render() {
    if (!this.props.lazy.loading && this.props.lazy.status === 200) {
      return <this.props.component data={this.props.lazy.data} />;
    }

    return null;
  }
}

export default connect(state => ({ lazy: state.lazy }))(LazyRoute);
