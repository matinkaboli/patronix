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
        site: null
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
      sites = sites.filter(obj => obj._id !== action.id);

      return { ...state, sites };
    }

    case types.sites.ADD_OPERATOR: {
      let operators = Array.from(state.site.operators);
      operators.push(action.operator);

      return {
        ...state,
        site: {
          ...state.site,
          operators
        }
      };
    }

    case types.sites.LEFT_OPERATOR: {
      let operators = Array.from(state.site.operators);
      operators = operators.filter(op => op.email !== action.operator.email);

      return {
        ...state,
        site: {
          ...state.site,
          operators
        }
      };
    }

    case types.sites.KICK_OPERATOR: {
      let sites = Array.from(state.sites);
      sites = sites.filter(site => site._id !== action.site._id);

      return {
        ...state,
        sites
      };
    }

    default: {
      return state;
    }
  }
};
