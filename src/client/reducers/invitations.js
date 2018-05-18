import types from 'Root/actions';

export default (state = [], action) => {
  switch (action.type) {
    case types.invitations.LOAD: {
      return [...state, ...action.invitations];
    }

    case types.invitations.ADD: {
      return [
        ...state,
        action.invitation
      ];
    }

    case types.invitations.ACCEPT: {
      let invitations = Array.from(state);
      invitations = invitations.filter(obj => obj.code !== action.code);
      return [
        ...invitations
      ];
    }

    case types.invitations.REJECT: {
      let invitations = Array.from(state);
      invitations = invitations.filter(obj => obj.code !== action.code);

      return [
        ...invitations
      ];
    }

    case types.CLEAR: {
      return [];
    }

    default: {
      return state;
    }
  }
};
