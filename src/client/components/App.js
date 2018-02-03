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

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route path='/activate/:code' component={Activate} />
          <ProtectedRoute path='/u'>
            <UserPanel />
          </ProtectedRoute>
        </Switch>
      </Router>
    );
  }
}

export default App;
