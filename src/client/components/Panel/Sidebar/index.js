import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SLink from './SLink';
import bind from 'Root/js/bind';
import logout from 'Root/actions/user/logout';
import defaultImage from 'Root/images/user-default.png';
import styles from './index.less';
import 'Root/styles/icon.less';

class Sidebar extends Component {
  shouldComponentUpdate() {
    return true;
  }

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
        to: '/panel',
        icon: 'user',
        text: 'داشبورد'
      },
      {
        to: '/panel/setting',
        icon: 'cog',
        text: 'تنظیمات'
      },
      {
        to: '/panel/sites',
        icon: 'globe',
        text: 'سایت ها'
      },
      {
        to: '/panel/chats',
        icon: 'comment',
        text: 'چت ها'
      },
      {
        to: '#',
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
          {links.map((v, i) => <li key={i}><SLink {...v} /></li> )}
        </ul>
      </nav>
    );
  }
}

export default withRouter(connect(
  state => ({ user: state.user })
)(Sidebar));
