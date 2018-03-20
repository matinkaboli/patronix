import React, { Component } from 'react';
import { connect } from 'react-redux';

import bind from 'Root/js/bind';
import types from 'Root/actions';
import toggle from 'Root/js/toggle';

import styles from './index.less';

class Header extends Component {
  @bind
  maximize() {
    if (!this.props.appStatus) {
      this.props.dispatch({
        type: types.appStatus.ACTIVE
      });
    }
  }

  @bind
  minimize() {
    this.props.dispatch({
      type: types.appStatus.DEACTIVE
    });
  }

  render() {
    return (
      <div
        className={toggle(styles, this.props.appStatus, 'container')}
        onClick={this.maximize}>
        <div className={styles.head}>
          <h4
            className={toggle(styles, this.props.appStatus, 'circle')}>
            پشتیبانی
          </h4>
          <span
            className={styles.icon + ' pat-minus'}
            onClick={this.minimize}/>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    appStatus: state.appStatus
  })
)(Header);
