import { combineReducers } from 'redux';

import user from './user';
import lazy from './lazy';
import captcha from './captcha';

export default combineReducers({
  user,
  lazy,
  captcha
});
