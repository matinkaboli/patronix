import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Sidebar from './Sidebar';
import Sites from './Sites';
import Setting from './Setting';
import HomePanel from './HomePanel';
import Chats from './Chats';
import Site from './Site';
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
            <Route path='/panel/chats' component={Chats} />
            <Route path='/panel/sites/:sitename' component={Site} />
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
