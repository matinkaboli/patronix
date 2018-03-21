export default {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  SET_CAPTCHA: 'SET_CAPTCHA',
  lazy: {
    START_LOADING: 'lazy/START_LOADING',
    STOP_LOADING: 'lazy/STOP_LOADING'
  },
  user: {
    LOAD: 'user/LOAD',
    SET_AVATAR: 'user/SET_AVATAR',
    UPDATE_NAME: 'user/UPDATE_NAME',
    REMOVE_AVATAR: 'user/REMOVE_AVATAR',
    UPDATE_EMAIL: 'user/UPDATE_EMAIL',
    LOGIN: 'user/LOGIN',
    LOGOUT: 'user/LOGOUT',
    LOGIN_FAILED: 'user/LOGIN_FAILED'
  },
  sites: {
    LOAD: 'sites/LOAD',
    ADD: 'sites/ADD',
    UPDATE_NAME: 'sites/UPDATE_NAME',
    REVOKE_TOKEN: 'sites/REVOKE_TOKEN',
    LEAVE: 'sites/LEAVE',
    REMOVE_OPERATOR: 'sites/REMOVE_OPERATOR'
  },
  invitations: {
    LOAD: 'invitations/LOAD'
  }
};
