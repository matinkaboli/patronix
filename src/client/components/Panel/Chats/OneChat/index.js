import React, { Component } from 'react';
import { connect } from 'react-redux';

import Box from 'Root/components/Box';

import styles from './index.less';


class Chat extends Component {
  render() {
    let chat;

    for (const i of this.props.chats.keys()) {
      if (this.props.chats[i]._id === this.props.match.params.id) {
        chat = this.props.chats[i];
        break;
      }
    }

    if (!chat) {
      return (
        <Box>
          <h1 className={styles.title}>یافت نشد</h1>
        </Box>
      );
    }

    return (
      <Box>
        <h1>Hello Chat</h1>
      </Box>
    );
  }
}

export default connect(
  state => ({
    chats: state.chats
  })
)(Chat);
