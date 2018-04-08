import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Index from './Index';
import Code from './Code';


class Recovery extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/recovery' component={Index} />
          <Route path='/recovery/:code' component={Code} />
        </Switch>
      </div>
    );
  }
}

export default Recovery;
