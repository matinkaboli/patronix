import types from 'Root/actions';

export default (state = [], action) => {
  switch (action.type) {
    case types.chats.NEW: {
      return [
        ...state,
        {
          from: action.message.from,
          _id: action.message._id,
          taken: false,
          finished: false,
          messages: [{
            message: action.message.message,
            time: 122222222,
            sender: 'CUSTOMER'
          }]
        }
      ];
    }

    case types.chats.LOAD: {
      return [
        ...state,
        ...action.data
      ];
    }

    case types.chats.FINISH: {
      const chats = Array.from(state);

      for (const i of chats.keys()) {
        if (chats[i]._id === action.id) {
          chats[i].finished = true;
          break;
        }
      }

      return chats;
    }

    case types.chats.NEW_MESSAGE: {
      const chats = Array.from(state);

      for (const i of chats.keys()) {
        if (chats[i]._id === action.id) {
          chats[i].messages.push({
            message: action.message,
            time: action.res,
            sender: 'CLIENT'
          });
          break;
        }
      }

      return chats;
    }

    case types.chats.TAKE: {
      const chats = Array.from(state);

      for (const i of chats.keys()) {
        if (chats[i]._id === action.id) {
          chats[i].taken = true;
          break;
        }
      }

      return chats;
    }

    default: {
      return state;
    }
  }
};
