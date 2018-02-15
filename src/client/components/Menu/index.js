import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import styles from './index.less';

class Menu extends Component {
  render() {
    return (
      <div className={styles.header}>
        <h1><Link to='/'>Patronix</Link></h1>
        <ul>
          <li><Link to='/login'>ورود</Link></li>
          <li><Link to='/signup'>ثبت نام</Link></li>
          <li><Link to='/about-us'>درباره ما</Link></li>
        </ul>
      </div>
    );
  }
}

export default Menu;
