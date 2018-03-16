import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './index.less';
import 'Root/styles/icon.less';

class SLink extends Component {
  render() {
    return (
      <Fragment>
        {this.props.links.map((v, i) =>
          <li key={i} className={styles.li} onClick={v.handleClick}>
            <NavLink exact to={v.href} activeClassName='activedNavLink'>
              <div className={styles.sidebarLink}>
                <div className={`icon icon-${v.icon}`} />
                <span className='tooltip'>{v.text}</span>
                <span className={styles.buttonText}>{v.text}</span>
              </div>
            </NavLink>
          </li>
        )}
      </Fragment>
    );
  }
}

export default SLink;