import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import Panel from './Panel';
import Public from './Public';
import NotFound from './NotFound';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <ProtectedRoute path='/panel' component={Panel} />
          <Route path='/' component={Public} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
