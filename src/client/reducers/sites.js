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

    default: {
      return state;
    }
  }
};
