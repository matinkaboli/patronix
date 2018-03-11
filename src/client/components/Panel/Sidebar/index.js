import React, { Component } from 'react';
import { connect } from 'react-redux';

import SLink from './Link';
import bind from 'Root/js/bind';
import logout from 'Root/actions/user/logout';
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
    const links = [
      {
        href: '/panel',
        icon: 'user',
        text: 'داشبورد'
      },
      {
        href: '/panel/setting',
        icon: 'cog',
        text: 'تنظیمات'
      },
      {
        href: '/panel/sites',
        icon: 'globe',
        text: 'سایت ها'
      },
      {
        href: '/panel/chats',
        icon: 'comment',
        text: 'چت ها'
      },
      {
        href: '#',
        icon: 'sign-out',
        text: 'خروج',
        handleClick: this.logout
      }
    ];

    return (
      <nav className={styles.nav}>
        <div className={styles.userInfo}>
          {this.renderImage()}
          <p>
            {this.props.user.name}
          </p>
        </div>
        <ul>
          <SLink links={links} />
        </ul>
      </nav>
    );
  }
}

export default connect(
  state => ({ user: state.user })
)(Sidebar);
