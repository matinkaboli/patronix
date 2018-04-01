import types from 'Root/actions';
import history from 'Root/history';

export default (state = {}, action) => {
  switch (action.type) {

    case types.chat.TAKE: {
      return {
        _id: action.chat._id,
        taken: true,
        chats: [
          {
            message: action.chat.chats[0].message,
            time: action.chat.chats[0].time,
            sender: 0
          }
        ],
        site: {
          name: action.chat.site.name
        }
      };
    }

    case types.chat.FINISH: {
      history.push('/panel');

      return {};
    }

    case types.chat.NEW_MESSAGE: {
      const chat = {
        ...state
      };

      chat.messages.push(action.message);

      return chat;
    }

    case types.chat.LOAD: {
      return {
        ...state,
        ...action.data
      };
    }

    default: {
      return state;
    }
  }
};
