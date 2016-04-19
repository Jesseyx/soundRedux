import { combineReducers } from 'redux';
import authed from './authed';
import entities from './entities';
import environment from './environment';
import playlists from './playlists';

const rootReducer = combineReducers({
  authed,
  entities,
  environment,
  playlists,
})

export default rootReducer;