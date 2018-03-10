import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import styles from './index.less';
import 'Root/styles/icon.less';

class SLink extends Component {
  render() {
    return (
      <Fragment>
        {this.props.links.map((v, i) =>
          <li key={i} className={styles.li} onClick={v.handleClick}>
            <Link to={v.href}>
              <div className={styles.sidebarLink}>
                <div className={`icon icon-${v.icon}`} />
                <span className={styles.tooltip}>{v.text}</span>
                <span className={styles.buttonText}>{v.text}</span>
              </div>
            </Link>
          </li>
        )}
      </Fragment>
    )
  }
}

export default SLink;
