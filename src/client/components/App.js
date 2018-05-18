import React, { Component } from 'react';
import {
  Router,
  Route,
  Switch
} from 'react-router-dom';

import history from 'Root/history';

import ProtectedRoute from './ProtectedRoute';
import Public from './Public';
import About from './About';
import Panel from './Panel';
import Home from './Home';

export default class extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <ProtectedRoute path='/panel' component={Panel} />
          <Route exact path='/about' component={About} />
          <Route exact path='/' component={Home} />
          <Route path='/' component={Public} />
        </Switch>
      </Router>
    );
  }
}
