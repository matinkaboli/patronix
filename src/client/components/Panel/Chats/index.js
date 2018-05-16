import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import History from './History';
import Chat from './OneChat';
import HotChats from './HotChats';

class Index extends Component {
  render() {
    return <Switch>
      <Route path='/panel/hotchats' component={HotChats} />
      <Route exact path='/panel/chats/history' component={History} />
      <Route exact path='/panel/chats/:id' component={Chat} />
    </Switch>;
  }
}

export default Index;
