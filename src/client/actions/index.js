export default {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
  SET_CAPTCHA: 'SET_CAPTCHA',
  LOGOUT: 'LOGOUT',
  LOGIN: 'LOGIN',
  lazy: {
    START_LOADING: 'lazy/START_LOADING',
    STOP_LOADING: 'lazy/STOP_LOADING'
  },
  user: {
    REMOVE_AVATAR: 'user/REMOVE_AVATAR',
    UPDATE_EMAIL: 'user/UPDATE_EMAIL',
    LOGIN_FAILED: 'user/LOGIN_FAILED',
    UPDATE_NAME: 'user/UPDATE_NAME',
    SET_AVATAR: 'user/SET_AVATAR',
    LOGOUT: 'user/LOGOUT',
    LOGIN: 'user/LOGIN',
    LOAD: 'user/LOAD'
  },
  sites: {
    REMOVE_OPERATOR: 'sites/REMOVE_OPERATOR',
    OPERATOR_JOINED: 'sites/OPERATOR_JOINED',
    LEAVE_OPERATOR: 'sites/LEAVE_OPERATOR',
    LEFT_OPERATOR: 'sites/LEFT_OPERATOR',
    KICK_OPERATOR: 'sites/KICK_OPERATOR',
    REVOKE_TOKEN: 'sites/REVOKE_TOKEN',
    ADD_OPERATOR: 'sites/ADD_OPERATOR',
    UPDATE_NAME: 'sites/UPDATE_NAME',
    REMOVE: 'sites/REMOVE',
    LOAD: 'sites/LOAD',
    ADD: 'sites/ADD',
    LOAD_OWNED: 'sites/LOAD_OWNED'
  },
  invitations: {
    ACCEPT: 'invitations/ACCEPT',
    LOAD: 'invitations/LOAD',
    REJECT: 'invitations/REJECT',
    ADD: 'invitations/ADD',
  },
  chat: {
    NEW_MESSAGE: 'chat/NEW_MESSAGE',
    FINISH: 'chat/FINISH',
    TAKE: 'chat/TAKE',
    LOAD: 'chat/LOAD',
    NEW: 'chat/NEW'
  },
  newChats: {
    REMOVE: 'newChats/REMOVE',
    NEW: 'newChats/NEW'
  },
  historyChats: {
    NEW: 'historyChats/NEW'
  }
};
