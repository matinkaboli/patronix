import React, { Component } from 'react';

import styles from './index.less';


export default class extends Component {
  render() {

    return <textarea
      {...this.props}
      ref='textarea'
      className={styles.textarea}
    />;

  }
}
