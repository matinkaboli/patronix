import React, { Component } from 'react';

import styles from './index.less';

class Button extends Component {
  render() {
    return <div
      onClick={this.props.handleClick}
      className={`${styles.btn} ${styles[this.props.color]}`}>
      <p>{ this.props.children }</p>
      <div />
    </div>;
  }
}

export default Button;
