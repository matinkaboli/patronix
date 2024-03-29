import types from 'Root/actions';

export default (state = {
  loading: false,
  status: 0,
  paths: [],
  data: null
}, action) => {
  switch (action.type) {
    case types.lazy.START_LOAD: {
      return {
        ...state,
        loading: true,
        status: 0,
        data: null
      };
    }

    case types.lazy.TEMP_STOP: {
      return {
        ...state,
        loading: false,
        status: action.status,
        data: action.data
      };
    }

    case types.lazy.CACHE_STOP: {
      return {
        ...state,
        loading: false,
        status: action.status,
        paths: [...state.paths, action.path]
      };
    }

    case types.lazy.CACHE: {
      return {
        ...state,
        paths: [...state.paths, action.path]
      };
    }

    case types.lazy.STATUS: {
      return {
        ...state,
        status: action.status
      };
    }

    default: {
      return state;
    }
  }
};
