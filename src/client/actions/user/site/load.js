import { dispatch } from 'Root/store';
import types from 'Root/actions';

export default data => {
  dispatch({
    type: types.user.site.LOAD,
    site: data.data.site
  });
};
