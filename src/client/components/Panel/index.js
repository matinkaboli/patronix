import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Sidebar from './Sidebar';
import Sites from './Sites';
import Setting from './Setting';
import HomePanel from './HomePanel';
import styles from './index.less';

class Panel extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Sidebar />

        <div className={styles.content}>
          <Switch>
            <Route exact path='/panel' component={HomePanel} />
            <Route path='/panel/setting' component={Setting} />
            <Route path='/panel/sites' component={Sites} />
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
