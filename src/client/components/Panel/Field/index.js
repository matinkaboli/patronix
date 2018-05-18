import React, { Component } from 'react';

import styles from './index.less';


export default class extends Component {
  render() {
    return (
      <div className={styles.section}>
        { this.props.children }
      </div>
    );
  }
}
