import React, { Component } from 'react';

import Chat from './Chat';

import styles from './index.less';


class Chats extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Chat
          sender='server'
          type='message'
        />
        <Chat
          sender='customer'
          type='message'
          time='10:24'
        />
        <Chat
          sender='server'
          type='message'
          time='10:45'
        />
      </div>
    );
  }
}

export default Chats;
