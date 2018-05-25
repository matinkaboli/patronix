import React, { Component } from 'react';

import Chat from './Chat';

import bind from 'Root/js/bind';

import styles from './index.less';

class ChatRoom extends Component {
  @bind
  header() {
    if (!this.props.chat.done && !this.props.chat.taken) {
      return (
        <div className={styles.info}>
          <img src={this.props.chat.site.avatar} className={styles.avatar} />
          <p>{this.props.chat.site.name}</p>
        </div>
      );
    }
  }

  render() {
    return (
      <div className={styles.content}>
        <div className={styles.header}>
          {this.header()}
        </div>

        <div className={styles.content}>
          {this.props.chat.chats.map(
            (v, i) => <Chat chat={v} key={i} />
          )}
        </div>

        <div className={styles.footer}>
          <p>footer</p>
        </div>
      </div>
    );
  }
}

export default ChatRoom;
