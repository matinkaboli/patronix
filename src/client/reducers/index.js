import { combineReducers } from 'redux';

import user from './user';
import lazy from './lazy';
import captcha from './captcha';
import sites from './sites';
import attempt from './attempt';

export default combineReducers({
  user,
  lazy,
  captcha,
  sites,
  attempt
});
