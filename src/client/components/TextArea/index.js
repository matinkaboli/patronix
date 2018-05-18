import React, { Component } from 'react';

import styles from './index.less';


export default class extends Component {
  render() {
    const props = { ...this.props };
    delete props.Ref;

    return <textarea
      {...props}
      ref={this.props.Ref}
      className={styles.textarea}
    />;

  }
}
