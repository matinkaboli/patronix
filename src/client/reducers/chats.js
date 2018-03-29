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
          messages: [action.message.message]
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
        }
      }

      return [
        ...chats
      ];
    }

    case types.chats.SENT: {
      console.log(state);
      console.log(action);
      return [
        ...state
      ];
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
