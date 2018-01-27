import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Login from './Login';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path='/login' component={Login} />
      </Router>
    );
  }
}

export default App;
