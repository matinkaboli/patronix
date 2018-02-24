import React, { Component } from 'react';
import {
  Route,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './Login';
import About from './About';
import Signup from './Signup';
import Recovery from './Recovery';
import Activate from './Activate';
import LazyRoute from 'Root/components/LazyRoute';
import styles from './index.less';

class Public extends Component {
  render() {
    if (!this.props.logged) {
      return (
        <div className={styles.root}>
          <div>
            <div className={styles.container}>
              <Switch>
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={Signup} />
                <Route path='/recovery' component={Recovery} />
                <Route path='/about' component={About} />
                <Redirect from='/about-us' to='/about' />
                <LazyRoute exact path='/activate/:code' component={Activate} />
              </Switch>
            </div>
          </div>
        </div>
      );
    }
    return <Redirect to='/panel' />;
  }
}

export default withRouter(connect(
  state => ({ logged: state.user.logged })
)(Public));
