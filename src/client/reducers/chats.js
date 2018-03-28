import types from 'Root/actions';

export default (state = [], action) => {
  switch (action.type) {
    case types.chats.ADD: {
      return [
        ...state,
        action.message
      ];
    }

    case types.chats.LOAD: {
      return [
        ...state,
        ...action.data
      ];
    }

    default: {
      return state;
    }
  }
};
