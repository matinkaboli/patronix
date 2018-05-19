import React, { Component } from 'react';

import styles from './index.less';


export default class extends Component {
  render() {
    const props = { ...this.props };

    return <textarea
      {...props}
      ref='textarea'
      className={styles.textarea}
    />;

  }
}
