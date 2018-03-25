import { combineReducers } from 'redux';

import invitations from './invitations';
import captcha from './captcha';
import attempt from './attempt';
import sites from './sites';
import user from './user';
import lazy from './lazy';
import chats from './chats';

export default combineReducers({
  invitations,
  captcha,
  attempt,
  sites,
  chats,
  user,
  lazy
});
