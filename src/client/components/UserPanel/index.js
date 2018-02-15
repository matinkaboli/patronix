import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import LazyRoute from 'Components/LazyRoute';
import Sidebar from './Sidebar';
import Sites from './Sites';
import Setting from './Setting';

class UserPanel extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <Switch>
          <LazyRoute path='/panel/setting' component={Setting} />
          <LazyRoute path='/panel/sites' component={Sites} />
        </Switch>
      </div>
    );
  }
}

export default UserPanel;
