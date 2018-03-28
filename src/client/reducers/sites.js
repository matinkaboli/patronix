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

      for (const i of operators.keys()) {
        if (operators[i].email === action.email) {
          operators.splice(i, 1);
          break;
        }
      }

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

      for (const i of sites.keys()) {
        if (sites[i]._id === action.id) {
          sites.splice(i, 1);
          break;
        }
      }

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

      for (const i of operators.keys()) {
        if (operators[i].email === action.operator.email) {
          operators.splice(i, 1);
          break;
        }
      }

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

      for (const i of sites.keys()) {
        if (sites[i]._id === action.site._id) {
          sites.splice(i, 1);
          break;
        }
      }
  
      return {
        ...state,
        sites
      };
    }

    case types.sites.OPERATOR_JOINED: {
      const sites = Array.from(state.sites);
      sites.push(action.site);

      return {
        ...state,
        sites
      };
    }

    case types.sites.LOAD_OWNED: {
      return {
        ...state,
        site: action.data
      };
    }

    default: {
      return state;
    }
  }
};
