import React, { Component } from 'react';
import { connect } from 'react-redux';


class Chat extends Component {
  render() {
    let chat;

    for (const i of this.props.chats.keys()) {
      if (this.props.chats[i]._id === this.props.match.params.id) {
        chat = this.props.chats[i];
        break;
      }
    }

    console.log(chat);

    return <h1>Hey man</h1>;
  }
}

export default connect(
  state => ({
    chats: state.chats
  })
)(Chat);
