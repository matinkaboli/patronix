import React, { Component } from 'react';
import Denied from 'Components/Denied';
import socket from 'Root/socket';

class LoadingRoute extends Component {
  state = {
    loading: true,
    permission: false
  }

  componentDidMount() {
    socket.once('get', res => {
      if (res.status) {
        this.setState({
          loading: false,
          data: res.data,
          permission: true
        });
      } else {
        this.setState({
          loading: false,
          permission: false
        });
      }
    });

    socket.emit('get', {
      path: this.props.computedMatch.path,
      params: this.props.computedMatch.params
    });
  }

  render() {
    if (!this.state.loading) {
      if (this.state.permission) {
        return <this.props.component data={this.state.data} />;
      }

      return <Denied />;
    }

    return <div />;
  }
}

export default LoadingRoute;
