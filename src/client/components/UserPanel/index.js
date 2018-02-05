import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LoadingRoute from 'Components/LoadingRoute';
import Sidebar from './Sidebar';
import Sites from './Sites';
import Setting from './Setting';

class UserPanel extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <Switch>
          <LoadingRoute path='/u/setting' component={Setting} />
          <LoadingRoute path='/u/sites' component={Sites} />
        </Switch>
      </div>
    );
  }
}

export default UserPanel;
