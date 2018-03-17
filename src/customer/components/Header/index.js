import React, { Component } from 'react';

import bind from 'Root/bind';
import styles from './index.less';

class Header extends Component {
  state = {
    active: false
  }

  @bind
  click() {
    this.setState({ active: true });
  }

  render() {
    let style = styles.header;
    if (this.state.active) {
      style = style + ' ' + styles.active;
    }

    return (
      <div className={style} onClick={this.click}>
        <p className={styles.circle}>
          پشتیبانی
        </p>
      </div>
    );
  }
}

export default Header;
