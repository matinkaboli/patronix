import React, { Component } from 'react';
import socket from 'Root/socket';

class Activate extends Component {
  state = {
    loading: true
  }

  componentDidMount() {
    socket.emit('activate', this.props.match.params.code);

    socket.once('activate', res => {
      if (res.status) {
        this.setState({
          loading: false,
          res: 'good'
        });
      }
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <p>
          mamad
        </p>
      );
    }

    return (
      <p>{this.state.res}</p>
    );
  }
}

export default Activate;
