import types from 'Root/actions';

export default (state = false, action) => {
  switch (action.type) {
    case types.appStatus.ACTIVE: {
      return true;
    }

    case types.appStatus.DEACTIVE: {
      return false;
    }

    default:
      return state;
  }
};
