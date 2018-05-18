import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './index.less';

class SLink extends Component {
  render() {
    return (
      <NavLink
        exact={this.props.exact || false}
        to={this.props.to}
        onClick={this.props.handleClick}
        activeClassName={styles.activedNavLink}>
        <div className={styles.sidebarLink}>
          <div className={`icon icon-${this.props.icon}`} />
          <span>{this.props.text}</span>
          <span className={styles.buttonText}>{this.props.text}</span>
          {this.props.notification ?
            <div
              className={styles.notification}>
              {this.props.notification}
            </div> : ''}
        </div>
      </NavLink>
    );
  }
}

export default SLink;
