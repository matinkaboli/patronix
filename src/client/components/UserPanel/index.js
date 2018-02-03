import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Sidebar from './Sidebar';

class HomePanel extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <Switch>
          <Route path='/u/setting'>
            <p> Setting</p>
          </Route>
        </Switch>
      </div>
    );
  }
}

export default HomePanel;
