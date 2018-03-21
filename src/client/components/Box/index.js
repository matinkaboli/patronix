import React, { Component } from 'react';

import styles from './index.less';


class Box extends Component {
  render() {
    return (
      <div className={styles.container}>
        {this.props.children}
      </div>
    );
  }
}

export default Box;
