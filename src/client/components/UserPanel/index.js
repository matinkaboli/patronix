import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import LoadingRoute from 'Components/LoadingRoute';
import Sidebar from './Sidebar';
import Sites from './Sites';

class UserPanel extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <Switch>
          <Route path='/u/setting'>
            <p>Setting</p>
          </Route>
          <LoadingRoute path='/u/sites/:id' component={Sites} />
        </Switch>
      </div>
    );
  }
}

export default UserPanel;
