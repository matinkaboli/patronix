import { combineReducers } from 'redux';

import appStatus from './appStatus';
import loading from './loading';

export default combineReducers({
  appStatus,
  loading
});
