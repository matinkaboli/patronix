import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './index.less';
import bind from 'Root/bind';
import logout from 'Root/actions/user/logout';
import 'Root/styles/icon.less';

class Sidebar extends Component {
  @bind
  logout() {
    this.props.dispatch(logout);
  }

  render() {
    return (
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to='/panel'>
              <div className="icon-user icon"></div>
              <span>داشبورد</span>
            </Link>
          </li>
          <li>
            <Link to='/panel/setting'>
              <div className="icon-cog icon"></div>
              <span>تنظیمات</span>
            </Link>
          </li>
          <li>
            <Link to='/panel/sites'>
              <div className="icon-globe icon"></div>
              <span>سایت ها</span>
            </Link>
          </li>
          <li>
            <Link to='/panel/chats'>
              <div className="icon-comment icon"></div>
              <span>چت ها</span>
            </Link>
          </li>
          <li>
            <Link to='#' onClick={this.logout}>
              <div className="icon-sign-out icon"></div>
              <span>خروج</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default connect()(Sidebar);
