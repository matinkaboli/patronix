import { combineReducers } from 'redux';

import user from './user';
import lazy from './lazy';
import setting from './setting';

export default combineReducers({
  user,
  lazy,
  setting
});
