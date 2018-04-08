import types from 'Root/actions';

export default (state = [], action) => {
  switch (action.type) {

    case types.newChats.NEW: {
      return [
        ...state,
        {
          ...action.chat
        }
      ];
    }

    case types.newChats.REMOVE: {
      const chats = Array.from(state);

      for (const i of chats.keys()) {
        if (chats[i]._id === action.id) {
          chats.splice(i, 1);
          break;
        }
      }

      return chats;
    }

    case types.newChats.LOAD: {
      return action.data;
    }

    default: {
      return state;
    }
  }
};
