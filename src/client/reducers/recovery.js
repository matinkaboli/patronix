import types from 'Root/actions';

export default (state = '', action) => {
  switch (action.type) {
    case types.recovery.SET_CAPTCHA: {
      return action.data.captcha;
    }

    default: {
      return state;
    }
  }
};
