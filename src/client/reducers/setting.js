import types from 'Root/actions';

const defaultState = {
  avatar: {}
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.setting.LOAD: {
      return action.data;
    }

    case types.setting.SET_AVATAR: {
      return {
        ...state,
        avatar: action.avatar
      };
    }

    default: {
      return state;
    }
  }
};
