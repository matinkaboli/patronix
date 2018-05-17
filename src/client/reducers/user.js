import types from 'Root/actions';

export default (state = {}, action) => {
  switch (action.type) {
    case types.user.LOGIN: {
      return {
        logged: true
      };
    }

    case types.user.LOGOUT: {
      return {
        logged: false
      };
    }

    case types.user.LOAD: {
      return {
        ...state,
        ...action.data
      };
    }

    case types.user.UPDATE_BIO: {
      return {
        ...state,
        bio: action.bio
      };
    }

    case types.user.SET_AVATAR: {
      return {
        ...state,
        avatar: action.avatar
      };
    }

    case types.user.UPDATE_NAME: {
      return {
        ...state,
        name: action.name
      };
    }

    case types.user.UPDATE_EMAIL: {
      return {
        ...state,
        email: action.email
      };
    }

    case types.user.REMOVE_AVATAR: {
      return {
        ...state,
        avatar: null
      };
    }

    case types.user.site.ADD: {
      return {
        ...state,
        sites: [ ...state.sites, {
          name: action.name,
          id: action.id
        }]
      };
    }

    case types.user.site.LOAD: {
      let index = state.sites.findIndex(i => i.id === action.site.id);

      return {
        ...state,
        sites: [
          ...state.sites.slice(0, index),
          {
            ...state.sites[index],
            ...action.site
          },
          ...state.sites.slice(index + 1)
        ]
      };
    }

    default: {
      return state;
    }
  }
};
