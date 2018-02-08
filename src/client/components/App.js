import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Login from './Login';
import Signup from './Signup';
import Activate from './Activate';
import ProtectedRoute from './ProtectedRoute';
import UserPanel from './UserPanel';
import Denied from './Denied';
import NotFound from './NotFound';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route path='/activate/:code' component={Activate} />
          <Route exact path='/denied' component={Denied} />
          <ProtectedRoute path='/u' component={UserPanel} />
          <Route exact path='/notfound' component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
