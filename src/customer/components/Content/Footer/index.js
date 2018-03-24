import React, { Component } from 'react';

import bind from 'Root/js/bind';
import send from 'Root/actions/send';
import styles from './index.less';

class Footer extends Component {
  @bind
  send() {
    send(this.refs.message.value);
  }

  @bind
  keypress(e) {
    if (e.key === 'Enter') {
      this.send();
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <input
          className={styles.input}
          ref='message'
          onKeyPress={this.keypress}
        />
        <button className={styles.button} onClick={this.send}>
          ارسال
        </button>
      </div>
    );
  }
}

export default Footer;
