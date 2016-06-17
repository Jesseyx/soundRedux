import * as types from '../constants/ActionTypes';

function changeCurrentTime (time) {
  return {
    type: types.CHANGE_CURRENT_TIME,
    time,
  }
}

function changeSelectedPlaylists(playlists, playlist) {
  const index = playlists.indexOf(playlist);

  if (index > -1) {
    playlists.splice(index, 1);
  }

  playlists.push(playlist);

  return {
    type: types.CHANGE_SELECTED_PLAYLISTS,
    playlists
  }
}

function changePlayingSong(songIndex) {
  return {
    type: types.CHANGE_PLAYING_SONG,
    songIndex,
  }
}

export function playSong(playlist, index) {
  return (dispatch, getState) => {
    dispatch(changeCurrentTime(0));

    const { player } = getState();
    const { selectedPlaylists } = player;
    const len = selectedPlaylists.length;

    // len - 1 和上面对应
    if (len === 0 || selectedPlaylists[len -1] !== playlist) {
      dispatch(changeSelectedPlaylists(selectedPlaylists, playlist));
    }

    dispatch(changePlayingSong(index));
  }
}

export function toggleIsPlaying(isPlaying) {
  return {
    type: types.TOGGLE_IS_PLAYING,
    isPlaying,
  }
}
