import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Invitation from './Invitation';
import HomePanel from './HomePanel';
import Sidebar from './Sidebar';
import Setting from './Setting';
import Sites from './Sites';
import Chats from './Chats';

import styles from './index.less';


class Panel extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Sidebar />

        <div className={styles.content}>
          <Switch>
            <Route exact path='/panel' component={HomePanel} />
            <Route path='/panel/sites' component={Sites} />
            <Route path='/panel/setting' component={Setting} />
            <Route path='/panel/chats' component={Chats} />
            <Route path='/panel/invitation' component={Invitation} />
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
