import React, { Component } from 'react';

import Chat from './Chat';
import styles from './index.less';

class Chats extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Chat />
        <Chat />
      </div>
    );
  }
}

export default Chats;
