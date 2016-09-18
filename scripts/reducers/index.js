import { combineReducers } from 'redux';
import authed from './authed';
import entities from './entities';
import environment from './environment';
import navigator from './navigator';
import player from './player';
import playlists from './playlists';
import modal from './modal';

const rootReducer = combineReducers({
  authed,
  entities,
  environment,
  navigator,
  player,
  playlists,
  modal,
})

export default rootReducer;
