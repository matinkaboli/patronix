import React, { Component } from 'react';

import styles from './index.less';


export default class extends Component {
  render() {
    let className = styles.container;
    if (this.props.classes) {
      className = `${className} ${this.props.classes}`;
    }
    return <div className={className}>
      {this.props.children}
    </div>;
  }
}
