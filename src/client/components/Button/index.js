import React, { Component } from 'react';

import styles from './index.less';

class Button extends Component {
  render() {
    return <div
      onClick={this.props.handleClick}
      className={`${styles.btn} ${styles[this.props.color]}`}>
      <div>{ this.props.children }</div>
    </div>;
  }
}

export default Button;
