import types from 'Root/actions';
import store from 'Root/store';

export default (state = [], action) => {
  switch (action.type) {

    case types.historyChats.NEW: {
      const chat = store.getState().chat;

      return [
        ...state,
        {
          ...chat,
          finished: true
        }
      ];
    }

    case types.historyChats.LOAD: {
      return action.data;
    }

    default: {
      return state;
    }
  }
};
