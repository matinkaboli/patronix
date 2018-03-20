import types from 'Root/actions';

export default (state = false, action) => {
  switch (action.type) {
    case types.loading.START: {
      return true;
    }

    case types.loading.STOP: {
      return false;
    }

    default: {
      return state;
    }
  }
};
