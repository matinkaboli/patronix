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

    case types.user.site.UPDATE_NAME: {
      const index = state.sites.findIndex(i => i.id === action.id);

      return {
        ...state,
        sites: [
          ...state.sites.slice(0, index),
          {
            ...state.sites[index],
            name: action.name
          },
          ...state.sites.slice(index + 1)
        ]
      };
    }

    case types.user.site.REVOKE_TOKEN: {
      const index = state.sites.findIndex(i => i.id === action.id);

      return {
        ...state,
        sites: [
          ...state.sites.slice(0, index),
          {
            ...state.sites[index],
            token: action.token
          },
          ...state.sites.slice(index + 1)
        ]
      };
    }

    case types.user.site.REMOVE_AVATAR: {
      const index = state.sites.findIndex(i => i.id === action.id);

      return {
        ...state,
        sites: [
          ...state.sites.slice(0, index),
          {
            ...state.sites[index],
            avatar: null
          },
          ...state.sites.slice(index + 1)
        ]
      };
    }

    case types.user.site.SET_AVATAR: {
      const index = state.sites.findIndex(i => i.id === action.id);

      return {
        ...state,
        sites: [
          ...state.sites.slice(0, index),
          {
            ...state.sites[index],
            avatar: action.avatar
          },
          ...state.sites.slice(index + 1)
        ]
      };
    }

    case types.user.site.LEFT_OPERATOR: {
      const index = state.sites.findIndex(i => i.id === action.id);
      const operators = state.sites[index].operators.filter(
        v => v.email !== action.email
      );


      return {
        ...state,
        sites: [
          ...state.sites.slice(0, index),
          {
            ...state.sites[index],
            operators
          },
          ...state.sites.slice(index + 1)
        ]
      };
    }

    case types.user.site.ADD_OPERATOR: {
      const index = state.sites.findIndex(i => i.id === action.id);

      return {
        ...state,
        sites: [
          ...state.sites.slice(0, index),
          {
            ...state.sites[index],
            operators: [
              ...state.sites[index].operators,
              ...action.operator
            ]
          },
          ...state.sites.slice(index + 1)
        ]
      };
    }

    case types.user.site.UPDATE_INFORMATION: {
      const index = state.sites.findIndex(i => i.id === action.id);

      return {
        ...state,
        sites: [
          ...state.sites.slice(0, index),
          {
            ...state.sites[index],
            information: action.information
          },
          ...state.sites.slice(index + 1)
        ]
      };
    }

    case types.user.site.REMOVE_OPERATOR: {
      const index = state.sites.findIndex(i => i.id === action.id);
      const operators = state.sites[index].operators.filter(
        v => v.email !== action.email
      );

      return {
        ...state,
        sites: [
          ...state.sites.slice(0, index),
          {
            ...state.sites[index],
            operators
          },
          ...state.sites.slice(index + 1)
        ]
      };
    }

    case types.user.site.REMOVE: {
      const index = state.sites.findIndex(i => i.id === action.id);

      return {
        ...state,
        sites: [
          ...state.sites.slice(0, index),
          ...state.sites.slice(index + 1)
        ]
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

    case types.CLEAR: {
      return {};
    }

    default: {
      return state;
    }
  }
};
