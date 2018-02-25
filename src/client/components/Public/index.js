import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';
import Recovery from './Recovery';
import Activate from './Activate';
import LazyRoute from 'Root/components/LazyRoute';
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
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default Public;
