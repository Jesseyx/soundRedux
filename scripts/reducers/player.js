import * as types from '../constants/ActionTypes';

const initialState = {
  currentSongIndex: null,
  currentTime: 0,
  isPlaying: false,
  selectedPlaylists: [],
}

export default function player(state = initialState, action) {
  return state;
}
