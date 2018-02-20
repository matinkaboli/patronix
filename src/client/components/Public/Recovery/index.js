import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import LazyRoute from 'Root/components/LazyRoute';
import Code from './Code';
import Index from './Index';

class Recovery extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/recovery' component={Index} />
          <LazyRoute path='/recovery/:code' component={Code} />
        </Switch>
      </div>
    );
  }
}

export default Recovery;
