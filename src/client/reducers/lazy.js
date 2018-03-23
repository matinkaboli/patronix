import types from 'Root/actions';

export default (state = { loading: false }, action) => {
  switch (action.type) {
    case types.lazy.START_LOADING: {
      return {
        loading: true
      };
    }

    case types.lazy.STOP_LOADING: {
      return {
        loading: false,
        status: action.status
      };
    }

    default: {
      return state;
    }
  }
};
