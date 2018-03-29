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

    case types.chats.LOAD: {
      return [
        ...state,
        ...action.data
      ];
    }

    case types.chat.FINISH: {
      return {};
    }

    case types.chats.NEW_MESSAGE: {
      const chats = Array.from(state);

      chats.messages.push({
        message: action.message,
        time: action.res,
        sender: action.customer ? 'CUSTOMER' : 'CLIENT'
      });

      return chats;
    }

    default: {
      return state;
    }
  }
};
