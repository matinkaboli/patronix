import types from 'Root/actions';

export default (state = '', action) => {
  switch (action.type) {
    case types.SET_CAPTCHA: {
      return action.captcha;
    }

    case types.CLEAR: {
      return '';
    }

    default: {
      return state;
    }
  }
};
