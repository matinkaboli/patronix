import types from 'Root/actions';

export default (state = {}, action) => {
  switch (action.type) {

    case types.chat.TAKE: {
      return {
        ...action.chat,
        taken: true,
        messages: [
          {
            message: action.chat.message,
            sender: 'CUSTOMER'
          }
        ]
      };
    }

    case types.chat.FINISH: {
      return {
        ...state,
        finished: true
      };
    }

    case types.chat.NEW_MESSAGE: {
      const chat = Object.assign({}, state);

      chat.messages.push({
        message: action.message,
        sender: action.customer ? 'CUSTOMER' : 'CLIENT'
      });

      return chat;
    }

    case types.chat.REMOVE: {
      return { finished: true };
    }

    default: {
      return state;
    }
  }
};
