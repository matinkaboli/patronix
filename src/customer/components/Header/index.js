import React, { Component } from 'react';
import { connect } from 'react-redux';

import bind from 'Root/js/bind';
import types from 'Root/actions';
import toggle from 'Root/js/toggle';
import init from 'Root/actions/init';
import Loading from './Loading';

import styles from './index.less';

class Header extends Component {
  @bind
  maximize() {
    if (!this.props.appStatus) {
      this.props.dispatch({
        type: types.appStatus.ACTIVE
      });

      this.props.dispatch(init);
    }
  }

  @bind
  minimize() {
    this.props.dispatch({
      type: types.appStatus.DEACTIVE
    });
  }

  @bind
  information() {
    if (this.props.loading) {
      return <Loading />;
    }

    return (
      <span>
        <span>
          {this.props.userState.online} آنلاین
        </span> - 
        <span className={styles.offline}>
          {this.props.userState.offline} آفلاین
        </span>
      </span>
    );
  }

  render() {
    return (
      <div
        className={toggle(styles, this.props.appStatus, 'container')}
        onClick={this.maximize}>
        <div className={styles.flexRow}>
          <h4
            className={toggle(styles, this.props.appStatus, 'circle')}>
            پشتیبانی
          </h4>
          <span
            className={styles.icon + ' pat-minus'}
            onClick={this.minimize}/>
        </div>

        <div className={styles.flexRow}>
          {this.information()}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    appStatus: state.appStatus,
    loading: state.loading,
    userState: state.userState
  })
)(Header);
