import types from 'Root/actions';

export default (state = 0, action) => {
  switch (action.type) {
    case types.LOGIN_FAILED: {
      return ++state;
    }

    case types.LOGIN_SUCCESS: {
      return 0;
    }

    default: {
      return state;
    }
  }
};
