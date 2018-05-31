import React, { Component } from 'react';

import styles from './index.less';

class Chat extends Component {
  render() {
    let chatStyle = styles[`message-${this.props.sender}`];

    return (
      <div className={styles[this.props.sender]}>
        <div className={`${styles.chat} ${chatStyle}`}>
          <p>
            {this.props.message}
          </p>
          <p className={styles.time}>
            {new Date(this.props.time).getHours()}:
            {new Date(this.props.time).getMinutes()}
          </p>
        </div>
      </div>
    );
  }
}

export default Chat;
