import { combineReducers } from 'redux';

import historyChats from './historyChats';
import invitations from './invitations';
import newChats from './newChats';
import captcha from './captcha';
import attempt from './attempt';
import sites from './sites';
import user from './user';
import lazy from './lazy';
import chat from './chat';
import hotChats from './hotChats';

export default combineReducers({
  historyChats,
  invitations,
  newChats,
  captcha,
  attempt,
  sites,
  chat,
  user,
  lazy,
  hotChats
});
