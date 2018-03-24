import types from 'Root/actions';

export default (state = {
  online: 0,
  offline: 0
}, action) => {
  switch (action.type) {
    case types.userState.LOAD: {
      return action.userState;
    }

    case types.userState.GET_ONLINE: {
      return {
        online: state.online + 1,
        offline: state.offline - 1
      };
    }

    case types.userState.GOES_OFFLINE: {
      return {
        online: state.online - 1,
        offline: state.offline + 1
      };
    }

    default: {
      return state;
    }
  }
};
