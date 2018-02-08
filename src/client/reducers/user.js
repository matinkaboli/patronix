import types from 'Root/actions';

export default (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN: {
      return {
        name: action.name,
        email: action.email,
        logged: true
      };
    }

    case types.LOGOUT: {
      return {
        logged: false
      };
    }

    default: {
      return state;
    }
  }
};
