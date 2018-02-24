import React, { Component } from 'react';
import { Switch } from 'react-router-dom';

import LazyRoute from 'Root/components/LazyRoute';
import Sidebar from './Sidebar';
import Sites from './Sites';
import Setting from './Setting';
import types from 'Root/actions';
import styles from './index.less';

class UserPanel extends Component {
  render() {
    return (
      <div>
        <div>
          <Sidebar />

          <div className={styles.container}>
            <Switch>
              <LazyRoute
                type={types.user.LOAD}
                path='/panel/setting'
                component={Setting} />
              <LazyRoute path='/panel/sites' component={Sites} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default UserPanel;
