import React, { Component } from 'react';

import styles from './index.less';

class Chat extends Component {
  render() {
    return (
      <div>
        <span className={styles.chat}>
          Hello there
        </span>
      </div>
    );
  }
}

export default Chat;
