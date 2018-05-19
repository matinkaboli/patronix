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
      REVOKE_TOKEN: 'user/site/REVOKE_TOKEN',
      UPDATE_NAME: 'user/site/UPDATE_NAME',
      UPDATE_BIO: 'user/site/UPDATE_BIO',
      REMOVE: 'user/site/REMOVE',
      LOAD: 'user/site/LOAD',
      ADD: 'user/site/ADD'
    }
  },
  sites: {
    UPDATE_INFORMATION: 'sites/UPDATE_INFORMATION',
    REMOVE_OPERATOR: 'sites/REMOVE_OPERATOR',
    OPERATOR_JOINED: 'sites/OPERATOR_JOINED',
    LEAVE_OPERATOR: 'sites/LEAVE_OPERATOR',
    LEFT_OPERATOR: 'sites/LEFT_OPERATOR',
    KICK_OPERATOR: 'sites/KICK_OPERATOR',
    REMOVE_AVATAR: 'sites/REMOVE_AVATAR',
    ADD_OPERATOR: 'sites/ADD_OPERATOR',
    UPDATE_NAME: 'sites/UPDATE_NAME',
    SET_AVATAR: 'sites/SET_AVATAR,',
    LOAD_OWNED: 'sites/LOAD_OWNED'
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
