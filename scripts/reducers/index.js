import { combineReducers } from 'redux';
import authed from './authed';
import entities from './entities';
import environment from './environment';
import navigator from './navigator';
import player from './player';
import playlists from './playlists';

const rootReducer = combineReducers({
  authed,
  entities,
  environment,
  navigator,
  player,
  playlists,
})

export default rootReducer;
