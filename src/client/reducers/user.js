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

    case types.user.UPDATE_NAME: {
      return {
        ...state,
        name: rest.name
      };
    }

    case types.user.REMOVE_AVATAR: {
      return {
        ...state,
        avatar: null
      };
    }

    default: {
      return state;
    }
  }
};
