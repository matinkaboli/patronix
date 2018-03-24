import types from 'Root/actions';

export default (state = { name: '', avatar: '', took: false }, action) => {
  switch (action.type) {
    case types.operator.LOAD: {
      return {
        ...action.operator,
        took: true
      };
    }

    default: {
      return state;
    }
  }
};
