import React, { Component } from 'react';

import styles from './index.less';

export default class extends Component {
  render() {
    let props = { ...this.props };
    delete props.Ref;

    return (
      <input
        className={styles.input}
        ref={this.props.Ref}
        {...props} />
    );
  }
}
