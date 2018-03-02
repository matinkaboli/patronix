import React, { Component } from 'react';

import styles from './index.less';

class Input extends Component {
  render() {
    return <input {...this.props} className={styles.input} />;
  }
}

export default Input;
