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

    default: {
      return state;
    }
  }
};
