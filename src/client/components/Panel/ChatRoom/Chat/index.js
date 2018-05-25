import React, { Component } from 'react';

class Chat extends Component {
  render() {
    return (
      <p>
        {this.props.chat.message}
      </p>
    );
  }
}

export default Chat;
