import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import logout from 'Root/actions/user/logout';

import bind from 'Root/js/bind';

import SLink from './SLink';

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
    const userInfoClasses = [styles.userInfo];

    if (this.props.loading) {
      userInfoClasses.push(styles.loading);
    } else {
      userInfoClasses.push(styles.notLoading);
    }

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
        to: '/panel/chats/history',
        icon: 'comment',
        text: 'چت های پیشین'
      },
      {
        to: '/panel/invitation',
        icon: 'user-plus',
        text: 'دعوت ها'
      },
      {
        to: '#',
        icon: 'sign-out',
        text: 'خروج',
        handleClick: this.logout
      }
    ];

    if (this.props.invitations && this.props.invitations.length) {
      links[5].notification = this.props.invitations.length;
    }

    if (this.props.chats && this.props.chats.length) {
      links[3].notification = this.props.chats.filter(
        obj => obj.taken === false
      ).length;
    }

    return (
      <nav className={styles.nav}>
        <div
          ref='userInfo'
          className={userInfoClasses.join(' ')}
        >
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
  state => ({
    user: state.user,
    loading: state.lazy.loading,
    invitations: state.invitations,
    chats: state.chats
  })
)(Sidebar));
