import types from 'Root/actions';

export default (state = {
  site: {},
  sites: []
}, { type, ...rest }) => {
  switch (type) {
    case types.sites.ADD: {
      return [...state, rest];
    }

    case types.sites.LOAD: {
      console.log(rest);
      return rest.data;
    }

    default: {
      return state;
    }
  }
};
