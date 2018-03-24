import types from 'Root/actions';

let defaultState = { name: '', avatar: '', took: false };

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.operator.LOAD: {
      return {
        ...action.operator,
        took: true
      };
    }

    case types.CLEAR: {
      return defaultState;
    }

    default: {
      return state;
    }
  }
};
