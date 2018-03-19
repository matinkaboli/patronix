import React, { Component } from 'react';
import { connect } from 'react-redux';

import bind from 'Root/js/bind';
import types from 'Root/actions';
import toggle from 'Root/js/toggle';

import styles from './index.less';

class Header extends Component {
  @bind
  click() {
    this.props.dispatch({
      type: types.appStatus.ACTIVE
    });
  }

  render() {
    return (
      <div
        className={toggle(styles, this.props.appStatus, 'container')}
        onClick={this.click}>
        <h4
          className={toggle(styles, this.props.appStatus, 'circle')}>
          پشتیبانی
        </h4>
      </div>
    );
  }
}

export default connect(
  state => ({
    appStatus: state.appStatus
  })
)(Header);
