import React, { Component } from 'react';

import styles from './index.less';

class Button extends Component {
  render() {
    return <button
      onClick={this.props.handleClick.bind(this)}
      className={`${styles.btn} ${styles[this.props.color]}`}>
      { this.props.children }
    </button>;
  }
}

export default Button;
