export default {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
  SET_CAPTCHA: 'SET_CAPTCHA',
  LOGOUT: 'LOGOUT',
  LOGIN: 'LOGIN',
  CLEAR: 'CLEAR',
  lazy: {
    START_LOAD: 'lazy/START_LOAD',
    CACHE_STOP: 'lazy/CACHE_STOP',
    TEMP_STOP: 'lazy/TEMP_STOP',
    STATUS: 'lazy/STATUS',
    CACHE: 'lazy/CACHE'
  },
  user: {
    REMOVE_AVATAR: 'user/REMOVE_AVATAR',
    UPDATE_EMAIL: 'user/UPDATE_EMAIL',
    LOGIN_FAILED: 'user/LOGIN_FAILED',
    UPDATE_NAME: 'user/UPDATE_NAME',
    SET_AVATAR: 'user/SET_AVATAR',
    UPDATE_BIO: 'user/UPDATE_BIO',
    LOGOUT: 'user/LOGOUT',
    LOGIN: 'user/LOGIN',
    LOAD: 'user/LOAD',
    site: {
      UPDATE_INFORMATION: 'user/site/UPDATE_INFORMATION',
      REMOVE_OPERATOR: 'user/site/REMOVE_OPERATOR',
      REMOVE_AVATAR: 'user/site/REMOVE_AVATAR',
      LEFT_OPERATOR: 'user/site/LEFT_OPERATOR',
      REVOKE_TOKEN: 'user/site/REVOKE_TOKEN',
      ADD_OPERATOR: 'user/site/ADD_OPERATOR',
      UPDATE_NAME: 'user/site/UPDATE_NAME',
      SET_AVATAR: 'user/site/SET_AVATAR',
      REMOVE: 'user/site/REMOVE',
      LOAD: 'user/site/LOAD',
      ADD: 'user/site/ADD'
    }
  },
  invitations: {
    ACCEPT: 'invitations/ACCEPT',
    REJECT: 'invitations/REJECT',
    LOAD: 'invitations/LOAD',
    ADD: 'invitations/ADD'
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
    LOAD: 'newChats/LOAD',
    NEW: 'newChats/NEW'
  },
  historyChats: {
    LOAD: 'historyChats/LOAD'
  },
  hotChats: {
    LOAD: 'hotChats/LOAD'
  }
};
