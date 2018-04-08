import { combineReducers } from 'redux';

import appStatus from './appStatus';
import loading from './loading';
import chats from './chats';
import userState from './userState';
import operator from './operator';

export default combineReducers({
  appStatus,
  loading,
  chats,
  userState,
  operator
});
