import React, { Component } from 'react';

import styles from './index.less';

class Field extends Component {
  render() {
    return (
      <div className={styles.section}>
        <div>
          <p className={styles.updateBtn}>به روز رسانی</p>
        </div>

        <div className={styles.currentValue}>
          <p>{ this.props.currentValue }</p>
          <p>{ this.props.name }</p>
        </div>
      </div>
    );
  }
}

export default Field;
