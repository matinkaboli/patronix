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
          <LoadingRoute path='/panel/setting' component={Setting} />
          <LoadingRoute path='/panel/sites' component={Sites} />
        </Switch>
      </div>
    );
  }
}

export default UserPanel;
