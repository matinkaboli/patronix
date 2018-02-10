import types from 'Root/actions';

export default (state = {}, { type, ...rest }) => {
  switch (type) {
    case types.LOGIN: {
      return {
        logged: true,
        ...rest
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
