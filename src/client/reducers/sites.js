import types from 'Root/actions';

export default (state = {
  site: {},
  sites: []
}, action) => {
  switch (action.type) {
    case types.sites.ADD: {
      console.log('Action: ', action);
      return { ...state, site: { name: action.name } };
    }

    case types.sites.LOAD: {
      console.log('LOAD: ', action);
      return action.data;
    }

    default: {
      return state;
    }
  }
};
