import types from 'Root/actions';

export default (state = 0, action) => {
  switch (action.type) {
    case types.LOGIN_FAILED: {
      return ++state;
    }

    default: {
      return state;
    }
  }
};
