import types from 'Root/actions';

export default (state = [], action) => {
  switch (action.type) {
    case types.invitations.LOAD: {
      return [...state, ...action.invitations];
    }

    case types.invitations.ADD: {
      console.log(state);
      console.log(action.invitation);
      return [
        ...state,
        action.invitation
      ];
    }

    default: {
      return state;
    }
  }
};
