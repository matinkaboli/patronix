import { combineReducers } from 'redux';

import user from './user';
import lazy from './lazy';
import captcha from './captcha';
import sites from './sites';

export default combineReducers({
  user,
  lazy,
  captcha,
  sites
});
