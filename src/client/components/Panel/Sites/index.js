import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import HomeSite from './HomeSite';
import Setting from './Setting';


export default class extends Component {
  render() {
    return (
      <Switch>
        <Route path='/panel/sites/:id' component={Setting} />
        <Route exact path='/panel/sites' component={HomeSite} />
      </Switch>
    );
  }
}
