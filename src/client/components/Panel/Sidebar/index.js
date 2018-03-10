import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import lazy from 'Root/js/lazy';
import bind from 'Root/js/bind';
import logout from 'Root/actions/user/logout';
import types from 'Root/actions';
import defaultImage from 'Root/images/user-default.png';
import styles from './index.less';
import 'Root/styles/icon.less';

class Sidebar extends Component {
  @bind
  logout() {
    this.props.dispatch(logout);
  }

  @bind
  renderImage() {
    if (this.props.user.avatar) {
      return (
        <img
          src={this.props.user.avatar}
          alt='عکس کاربر'
          className={styles.avatarImage} />
      );
    }

    return (
      <img
        src={defaultImage}
        alt='عکس کاربر'
        className={styles.avatarImage} />
    );
  }

  render() {
    return (
      <nav className={styles.nav}>
        <div className={styles.userInfo}>
          {this.renderImage()}
          <p>{this.props.user.email}</p>
          <p>{this.props.user.name}</p>
        </div>

        <ul>
          <li>
            <Link to='/panel'>
              <div className={styles.sidebarLink}>
                <div className="icon-user icon" />
                <span className={styles.tooltip}>داشبورد</span>
                <span className={styles.buttonText}>داشبورد</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to='/panel/setting'>
              <div className={styles.sidebarLink}>
                <div className="icon-cog icon" />
                <span className={styles.tooltip}>تنظیمات</span>
                <span className={styles.buttonText}>تنظیمات</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to='/panel/sites'>
              <div className={styles.sidebarLink}>
                <div className="icon-globe icon" />
                <span className={styles.tooltip}>سایت ها</span>
                <span className={styles.buttonText}>سایت ها</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to='/panel/chats'>
              <div className={styles.sidebarLink}>
                <div className="icon-comment icon" />
                <span className={styles.tooltip}>چت ها</span>
                <span className={styles.buttonText}>چت ها</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to='#' onClick={this.logout}>
              <div className={styles.sidebarLink}>
                <div className="icon-sign-out icon" />
                <span className={styles.tooltip}>خروج</span>
                <span className={styles.buttonText}>خروج</span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default lazy({
  component: connect(
    state => ({ user: state.user })
  )(Sidebar),
  type: types.user.LOAD
});
