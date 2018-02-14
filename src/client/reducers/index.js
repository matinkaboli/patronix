import { combineReducers } from 'redux';

import user from './user';
import lazy from './lazy';

export default combineReducers({
  user,
  lazy
});
