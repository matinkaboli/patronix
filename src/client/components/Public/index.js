import React, { Component } from 'react';
import {
  Route,
  Switch,
  Redirect,
  Link
} from 'react-router-dom';

import LoggedRoute from 'Root/components/LoggedRoute';
import NotFound from 'Root/components/NotFound';
import Denied from 'Root/components/Denied';
import Recovery from './Recovery';
import Activate from './Activate';
import Signup from './Signup';
import Login from './Login';

import styles from './index.less';


class Public extends Component {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.verticalRoot}>
          <Link to='/' className={styles.homeLink}>صفحه اصلی</Link>
          <div className={styles.container}>
            <Switch>
              <LoggedRoute exact path='/login' component={Login} />
              <LoggedRoute exact path='/signup' component={Signup} />
              <LoggedRoute path='/recovery' component={Recovery} />
              <Route exact path='/activate/:code' component={Activate} />
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
