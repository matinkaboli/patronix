import types from 'Root/actions';

export default (state = {}, action) => {
  switch (action.type) {
    case types.user.LOGIN: {
      return {
        logged: true,
        ...action.user
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
        ...action.data
      };
    }

    case types.user.SET_AVATAR: {
      return {
        ...state,
        avatar: action.avatar
      };
    }

    case types.user.UPDATE_NAME: {
      return {
        ...state,
        name: action.name
      };
    }

    case types.user.UPDATE_EMAIL: {
      return {
        ...state,
        email: action.email
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
