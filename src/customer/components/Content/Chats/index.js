import React, { Component } from 'react';

import Chat from './Chat';

import styles from './index.less';


class Chats extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Chat
          sender='customer'
          type='message'
        />
        <Chat
          sender='server'
          type='message'
        />
      </div>
    );
  }
}

export default Chats;
