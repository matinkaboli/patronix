import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './index.less';
import 'Root/libs/icon.less';

class Sidebar extends Component {
  render() {
    return (
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to='/panel'>
              <div className="icon-user icon">&nbsp;</div>
              <span>داشبورد</span>
            </Link>
          </li>
          <li>
            <Link to='/panel/setting'>
              <div className="icon-cog icon">&nbsp;</div>
              <span>تنظیمات</span>
            </Link>
          </li>
          <li>
            <Link to='/panel/sites'>
              <div className="icon-globe icon">&nbsp;</div>
              <span>سایت ها</span>
            </Link>
          </li>
          <li>
            <Link to='/panel/chats'>
              <div className="icon-comment icon">&nbsp;</div>
              <span>چت ها</span>
            </Link>
          </li>
          <li>
            <Link to='/panel/logout'>
              <div className="icon-sign-out icon">&nbsp;</div>
              <span>خروج</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Sidebar;
