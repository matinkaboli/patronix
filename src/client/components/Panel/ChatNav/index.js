import React, { Component, Children } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

import styles from './index.less';

export default class extends Component {
  state = {}

  render() {
    let data = [];
    Children.forEach(this.props.children, i => {
      data.push(i.props);
    });

    return (
      <div className={styles.container}>
        <div className={styles.nav}>
          {data.map((v, i) =>
            <NavLink
              to={v.path}
              className={styles.normal}
              activeClassName={styles.active}
              key={i}>
              {v.children}
            </NavLink>
          )}
        </div>

        <div>
          <Switch>
            {data.map((v, i) =>
              <Route key={i} path={v.path} render={v.render} />
            )}
          </Switch>
        </div>
      </div>
    );
  }
}

export const Section = () => {};
