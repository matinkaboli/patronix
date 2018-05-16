import types from 'Root/actions';

export default (state = [], action) => {
  switch (action.type) {
    case types.hotChats.LOAD: {
      return action.chats;
    }

    default: {
      return state;
    }
  }
};
