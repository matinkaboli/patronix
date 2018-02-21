import types from 'Root/actions';

export default (state = {}, { type, ...rest }) => {
  switch (type) {
    case types.user.LOGIN: {
      return {
        logged: true,
        ...rest
      };
    }

    case types.user.LOGOUT: {
      return {
        logged: false
      };
    }

    case types.user.LOAD: {
      return {
        ...state,
        ...rest.data
      };
    }

    case types.user.SET_AVATAR: {
      return {
        ...state,
        avatar: rest.avatar
      };
    }

    default: {
      return state;
    }
  }
};
