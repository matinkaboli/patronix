import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Recovery from './Recovery';
import Activate from './Activate';
import Menu from './Menu';
import Denied from 'Root/components/Denied';
import NotFound from 'Root/components/NotFound';
import LazyRoute from 'Root/components/LazyRoute';

class App extends Component {
  render() {
    return (
      <div>
        <Menu />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route path='/recovery' component={Recovery} />
          <LazyRoute exact path='/activate/:code' component={Activate} />
          <Route exact path='/denied' component={Denied} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
