import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './index.less';


class Chat extends Component {
  static propTypes = {
    sender: PropTypes.oneOf(['server', 'customer']).isRequired,
    type: PropTypes.oneOf(['error', 'message', 'warning']).isRequired,
    time: PropTypes.string,
    text: PropTypes.string.isRequired
  }

  render() {
    console.log(`${this.props.sender}-${this.props.type}`);
    let chatStyle = styles[`${this.props.sender}-${this.props.type}`];

    return (
      <div className={styles[this.props.sender]}>
        <div className={`${styles.chat} ${chatStyle}`}>
          <p>
            {this.props.text}
          </p>
          {
            this.props.time &&
            <p className={styles.time}>{this.props.time}</p>
          }
        </div>
      </div>
    );
  }
}

export default Chat;
