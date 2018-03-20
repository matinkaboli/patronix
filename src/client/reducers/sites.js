import types from 'Root/actions';

export default (state = {
  site: {},
  sites: []
}, action) => {
  switch (action.type) {
    case types.sites.ADD: {
      return { ...state, site: { name: action.name } };
    }

    case types.sites.LOAD: {
      return action.data;
    }

    case types.sites.UPDATE_NAME: {
      return {
        ...state,
        site: { ...state.site, name: action.name }
      };
    }

    case types.sites.REVOKE_TOKEN: {
      return {
        ...state,
        site: { ...state.site, token: action.token }
      };
    }

    case types.sites.REMOVE_OPERATOR: {
      console.log(state);
      console.log(action);
      return { ...state };
    }

    case types.sites.LEAVE: {
      const sites = Array.from(state.sites);
      sites.splice(action.id, 1);

      return { ...state, sites };
    }

    default: {
      return state;
    }
  }
};
