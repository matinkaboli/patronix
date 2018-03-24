import types from 'Root/actions';

export default (state = [], action) => {
  switch (action.type) {
    case types.chats.ADD: {
      return [
        ...state,
        action.chat
      ];
    }

    case types.chats.CLEAR_ERROR: {
      return state.slice().filter(chat => chat.type === 'message');
    }

    default: {
      return state;
    }
  }
};
