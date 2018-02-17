import types from 'Root/actions';

const defaultState = {
  avatar: {}
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.LOAD_SETTING: {
      return action.data;
    }

    case types.SET_AVATAR: {
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
