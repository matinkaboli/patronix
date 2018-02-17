import types from 'Root/actions';

export default (state = { loading: false }, { type, ...rest }) => {
  switch (type) {
    case types.lazy.START_LOADING: {
      return {
        loading: true
      };
    }

    case types.lazy.STOP_LOADING: {
      return {
        loading: false,
        ...rest
      };
    }

    default: {
      return state;
    }
  }
};
