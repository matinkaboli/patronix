import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomeSite from './HomeSite';
import Setting from './Setting';


class Sites extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/panel/sites/setting' component={Setting} />
        <Route exact path='/panel/sites' component={HomeSite} />
        <Route>
          <Redirect to='/notfound' />
        </Route>
      </Switch>
    );
  }
}

export default Sites;
