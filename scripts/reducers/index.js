import { combineReducers } from 'redux';
import authed from './authed';
import environment from './environment';

const rootReducer = combineReducers({
  authed,
  environment
})

export default rootReducer;