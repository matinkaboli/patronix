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

    case types.sites.operator.LEAVE: {
      const newSites = Array.from(state.sites);
      state.sites.splice(action.id, 1);

      return { ...state, sites: newSites };
    }

    default: {
      return state;
    }
  }
};
