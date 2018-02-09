import { Component } from 'react';
import { connect } from 'react-redux';
import types from 'Root/actions';
import socket from 'Root/socket';

class Logout extends Component {
  componentDidMount() {
    socket.once('logout', res => {
      if (res.status) {
        this.props.dispatch({ type: types.LOGOUT });
        localStorage.token = '';
      }
    });
    
    socket.emit('logout');
  }

  render() {
    return null;
  }
}

export default connect()(Logout);
