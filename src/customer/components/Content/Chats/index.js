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
          text='Error'
        />
        <Chat
          sender='customer'
          type='message'
          time='10:24'
          text='we have nothing say'
        />
        <Chat
          sender='server'
          type='message'
          time='10:45'
          text='but we have'
        />
      </div>
    );
  }
}

export default Chats;
