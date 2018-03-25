import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import HomeChats from './HomeChats';
import History from './History';


class Index extends Component {
  render() {
    return <Switch>
      <Route exact path='/panel/chats' component={HomeChats} />
      <Route exact path='/panel/chats/history' component={History} />
      <Route exact path='/panel/chats/:id' component={History} />
      <Route>
        <Redirect to='/notfound' />
      </Route>
    </Switch>;
  }
}

export default Index;
