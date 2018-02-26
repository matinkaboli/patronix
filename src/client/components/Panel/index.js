import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LazyRoute from 'Root/components/LazyRoute';
import Sidebar from './Sidebar';
import Sites from './Sites';
import Setting from './Setting';
import HomePanel from './HomePanel';
import types from 'Root/actions';
import styles from './index.less';

class Panel extends Component {
  render() {
    return (
      <div className={styles.root}>
        <Sidebar />

        <div className={styles.container}>
          <Switch className={styles.width}>
            <Route exact path='/panel' component={HomePanel} />
            <LazyRoute
              type={types.user.LOAD}
              path='/panel/setting'
              component={Setting} />
            <LazyRoute
              type={types.sites.LOAD}
              path='/panel/sites'
              component={Sites} />
            <Route>
              <Redirect to='/notfound' />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default Panel;
