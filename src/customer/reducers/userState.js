import types from 'Root/actions';

export default (state = {
  online: 0,
  offline: 0
}, action) => {
  switch (action.type) {
    case types.userState.LOAD: {
      return action.userState;
    }

    default: {
      return state;
    }
  }
};
