import { combineReducers } from 'redux';

import historyChats from './historyChats';
import invitations from './invitations';
import newChats from './newChats';
import hotChats from './hotChats';
import captcha from './captcha';
import attempt from './attempt';
import user from './user';
import lazy from './lazy';
import chat from './chat';

export default combineReducers({
  historyChats,
  invitations,
  newChats,
  hotChats,
  captcha,
  attempt,
  chat,
  user,
  lazy
});
