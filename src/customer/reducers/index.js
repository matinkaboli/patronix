import { combineReducers } from 'redux';

import appStatus from './appStatus';
import loading from './loading';
import chats from './chats';

export default combineReducers({
  appStatus,
  loading,
  chats
});
