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
import NotFound from 'Root/components/NotFound';
import styles from './index.less';

class Public extends Component {
  render() {
    return (
      <div className={styles.root}>
        <div>
          <div className={styles.container}>
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
              <Route path='/recovery' component={Recovery} />
              <LazyRoute exact path='/activate/:code' component={Activate} />
              <Route path='/notfound' component={NotFound} />
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
