import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import LazyRoute from 'Root/components/LazyRoute';

// import Sidebar from './Sidebar';
import Sites from './Sites';
import Setting from './Setting';
import types from 'Root/actions';

class UserPanel extends Component {
  render() {
    return (
      <div>
        {/* <Sidebar /> */}
        <Switch>
          <LazyRoute
            type={types.user.LOAD}
            path='/panel/setting'
            component={Setting} />
          <LazyRoute path='/panel/sites' component={Sites} />
        </Switch>
      </div>
    );
  }
}

export default UserPanel;
