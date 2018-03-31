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

    default: {
      return state;
    }
  }
};
