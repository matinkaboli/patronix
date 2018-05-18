import React, { Component, Children } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';

import styles from './index.less';

export default class extends Component {
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
              to={this.props.rootPath + v.path}
              className={styles.normal}
              activeClassName={styles.active}
              key={i}>
              {v.children}
            </NavLink>
          )}
        </div>

        <div className={styles.content}>
          <Switch>
            {data.map((v, i) =>
              <Route
                key={i}
                path={this.props.rootPath + v.path}
                render={
                  () => <v.component
                  {...this.props.rootProps}
                  {...v.componentProps} />
                } />
            )}
          </Switch>
        </div>
      </div>
    );
  }
}

export const Section = () => {};
