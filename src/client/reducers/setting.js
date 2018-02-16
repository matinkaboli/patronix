import types from 'Root/actions';

const defaultState = {
  avatar: {}
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.LOAD_SETTING: {
      return action.data;
    }

    default: {
      return state;
    }
  }
};
