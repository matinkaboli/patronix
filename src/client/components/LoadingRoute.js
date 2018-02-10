import React, { Component } from 'react';
import { withRouter } from 'react-router';
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

  componentDidUpdate() {
    if (!this.state.permission) {
      this.props.history.push('/denied');
    }
  }

  render() {
    if (!this.state.loading && this.state.permission) {
      return <this.props.component data={this.state.data} />;
    }

    return <div />;
  }
}

export default withRouter(LoadingRoute);
