import types from 'Root/actions';

export default (state = [], action) => {
  switch (action.type) {
    case types.chats.NEW: {
      return [
        ...state,
        {
          from: action.message.from,
          _id: action.message._id,
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

    default: {
      return state;
    }
  }
};
