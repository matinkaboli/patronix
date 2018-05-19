import React, { Component } from 'react';

import styles from './index.less';

export default class extends Component {
  render() {
    return (
      <input
        className={styles.input}
        ref='input'
        {...this.props} />
    );
  }
}
