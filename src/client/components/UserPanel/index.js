import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import LoaderRoute from 'Components/LoaderRoute';
import Sidebar from './Sidebar';
import Sites from './Sites';
import Setting from './Setting';

class UserPanel extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <Switch>
          <LoaderRoute path='/panel/setting' component={Setting} />
          <LoaderRoute path='/panel/sites' component={Sites} />
        </Switch>
      </div>
    );
  }
}

export default UserPanel;
