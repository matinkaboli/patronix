import React, { Component } from 'react';

import styles from './index.less';

class VButton extends Component {
  render() {
    return <button className={styles.btn}>{ this.props.children }</button>;
  }
}

export default VButton;
