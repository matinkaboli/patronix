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

    case types.sites.REMOVE: {
      return {
        ...state,
        sites: []
      };
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

    case types.sites.ACCEPT_OPERATOR: {
      console.log(action);
      console.log(state);
      return {
        ...state
      };
    }

    case types.sites.REMOVE_OPERATOR: {
      let operators = Array.from(state.site.operators);
      operators = operators.filter(obj => obj.email !== action.email);

      return {
        ...state,
        site: {
          ...state.site,
          operators
        }
      };
    }

    case types.sites.LEAVE_OPERATOR: {
      let sites = Array.from(state.sites);
      sites = sites.filter(obj => obj.email !== action.id);

      return { ...state, sites };
    }

    default: {
      return state;
    }
  }
};
