import React, { Component } from 'react';

import styles from './index.less';


class Field extends Component {
  render() {
    return (
      <div className={styles.section}>
        { this.props.children }
      </div>
    );
  }
}

export default Field;
