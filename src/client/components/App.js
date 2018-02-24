import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import Panel from './Panel';
import Public from './Public';
import Home from './Home';
import About from './About';

class App extends Component {
  render() {
    return (
      <Router>
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

export default App;
