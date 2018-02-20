import { LOGOUT } from 'Root/actions';

export default dispatch => {
  dispatch({
    type: LOGOUT
  });

  localStorage.token = '';
};
