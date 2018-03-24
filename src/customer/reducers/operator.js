import types from 'Root/actions';

export default (state = { name: '', avatar: '' }, action) => {
  switch (action.type) {
    case types.operator.LOAD: {
      return action.operator;
    }

    default: {
      return state;
    }
  }
};
