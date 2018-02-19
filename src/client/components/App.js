import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Recovery from './Recovery';
import Activate from './Activate';
import ProtectedRoute from './ProtectedRoute';
import LazyRoute from './LazyRoute';
import Panel from './Panel';
import Denied from './Denied';
import NotFound from './NotFound';
import Logout from './Logout';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/logout' component={Logout} />
          <Route exact path='/signup' component={Signup} />
          <Route path='/recovery' component={Recovery} />
          <LazyRoute exact path='/activate/:code' component={Activate} />
          <ProtectedRoute path='/panel' component={Panel} />
          <Route exact path='/denied' component={Denied} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
