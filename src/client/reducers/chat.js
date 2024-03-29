import types from 'Root/actions';

export default (state = {}, action) => {
  switch (action.type) {

    case types.chat.TAKE: {
      return {
        ...action.chat,
        taken: true,
        done: false
      };
    }

    case types.chat.FINISH: {
      return {};
    }

    case types.chat.NEW_MESSAGE: {
      const chat = {
        ...state
      };

      chat.chats.push(action.message);

      return chat;
    }

    case types.chat.LOAD: {
      return {
        ...state,
        ...action.data
      };
    }

    case types.CLEAR: {
      return {};
    }

    default: {
      return state;
    }
  }
};
