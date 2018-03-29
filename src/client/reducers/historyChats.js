import types from 'Root/actions';

export default (state = [], action) => {
  switch (action.type) {

    case types.historyChats.NEW: {
      return [
        ...state,
        action.chat
      ];      
    }

    default: {
      return state;
    }
  }
};
