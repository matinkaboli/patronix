import React, { Component } from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';
import Recovery from './Recovery';
import Activate from './Activate';
import LazyRoute from 'Root/components/LazyRoute';
import LoggedRoute from 'Root/components/LoggedRoute';
import NotFound from 'Root/components/NotFound';
import Denied from 'Root/components/Denied';
import styles from './index.less';

class Public extends Component {
  render() {
    return (
      <div className={styles.root}>
        <div>
          <div className={styles.container}>
            <Switch>
              <LoggedRoute exact path='/login' component={Login} />
              <LoggedRoute exact path='/signup' component={Signup} />
              <LoggedRoute path='/recovery' component={Recovery} />
              <LazyRoute exact path='/activate/:code' component={Activate} />
              <Route path='/notfound' component={NotFound} />
              <Route path='/denied' component={Denied} />
              <Route>
                <Redirect to='/notfound' />
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default Public;
