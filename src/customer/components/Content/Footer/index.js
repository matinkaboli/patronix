import React, { Component } from 'react';

import bind from 'Root/js/bind';
import send from 'Root/actions/send';
import styles from './index.less';

class Footer extends Component {
  @bind
  send() {
    send(this.refs.message.value);
  }

  render() {
    return (
      <div className={styles.container}>
        <input className={styles.input} ref='message' />
        <button className={styles.button} onClick={this.send}>
          ارسال
        </button>
      </div>
    );
  }
}

export default Footer;
