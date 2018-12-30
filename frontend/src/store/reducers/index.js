import { combineReducers } from 'redux';
import auth from './auth';
import currentUser from './currentUser';
import goals from './goals';
import error from './error';

const rootReducer = combineReducers({
  auth,
  currentUser,
  goals,
  error
});

export default rootReducer;
