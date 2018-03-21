import React, { Component } from 'react';

import styles from './index.less';

class Footer extends Component {
  render() {
    return (
      <div className={styles.container}>
        <input className={styles.input} ref='message' />
        <button className={styles.button}>
          ارسال
        </button>
      </div>
    );
  }
}

export default Footer;
