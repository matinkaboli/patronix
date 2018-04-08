import types from 'Root/actions';

export default (state = {
  loading: false,
  status: 0
}, action) => {
  switch (action.type) {
    case types.lazy.START_LOADING: {
      return {
        ...state,
        loading: true,
        status: 0
      };
    }

    case types.lazy.STOP_LOADING: {
      return {
        ...state,
        loading: false,
        status: action.status
      };
    }

    default: {
      return state;
    }
  }
};
