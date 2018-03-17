import types from 'Root/actions';

export default (state = false, action) => {
  switch (action.type) {
    case types.activeStatus.on:
      return true;

    case types.activeStatus.off:
      return false;

    default:
      return state;
  }
};
