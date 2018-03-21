import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './index.less';

class Chat extends Component {
  static propTypes = {
    sender: PropTypes.oneOf(['server', 'customer']).isRequired,
    type: PropTypes.oneOf(['error', 'message']).isRequired
  }

  render() {
    let chatStyle = styles[`${this.props.sender}-${this.props.type}`];

    return (
      <div className={styles[this.props.sender]}>
        <span className={`${styles.chat} ${chatStyle}`}>
          Hello there
        </span>
      </div>
    );
  }
}

export default Chat;
