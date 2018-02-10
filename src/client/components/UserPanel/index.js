import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import Sites from './Sites';
import Setting from './Setting';

class UserPanel extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <Link to='/panel/setting'>Setting</Link>
        <Switch>
          <Route path='/panel/setting' component={Setting} />
          <Route path='/panel/sites' component={Sites} />
        </Switch>
      </div>
    );
  }
}

export default UserPanel;
