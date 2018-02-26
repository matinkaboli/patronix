import types from 'Root/actions';

export default (state = [], { type, ...rest }) => {
  switch (type) {
    case types.sites.ADD: {
      return [...state, rest];
    }

    case types.sites.LOAD: {
      return [...state, ...rest.data];
    }

    default: {
      return state;
    }
  }
};
