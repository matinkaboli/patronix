import types from 'Root/actions';

export default (state = [], action) => {
  switch (action.type) {
    case types.hotChats.LOAD: {
      return action.chats;
    }

    case types.CLEAR: {
      return [];
    }

    case types.hotChats.TAKE: {
      let index = state.findIndex(i => i.id === action.id);

      return [
        ...state.slice(0, index),
        {
          ...state[index],
          taken: true
        },
        ...state.slice(index + 1)
      ];
    }

    default: {
      return state;
    }
  }
};
