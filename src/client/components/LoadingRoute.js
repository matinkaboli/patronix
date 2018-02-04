import React, { Component } from 'react';
import Denied from 'Components/Denied';
import socket from 'Root/socket';

class LoadingRoute extends Component {
  state = {
    loading: true
  }

  componentDidMount() {
    socket.emit('get', {
      path: this.props.computedMatch.path,
      params: this.props.computedMatch.params
    });
  }

  render() {
    if (!this.state.loading) {
      return (
        <p>Shit</p>
      );
    }

    return <div />;
  }
}

export default LoadingRoute;
