import merge from '../../node_modules/lodash/merge';
import * as types from '../constants/ActionTypes';
import { AUTHED_PLAYLIST_SUFFIX } from '../constants/PlaylistConstants';

function playlist(state, action) {
  switch (action.type) {
    case types.REQUEST_SONGS:
      return Object.assign({}, state, {
        isFetching: true,
        nextUrl: null,
      });

    case types.RECEIVE_SONGS:
      return Object.assign({}, state, {
        isFetching: false,
        items: [...state.items, ...action.songs],
        nextUrl: action.nextUrl,
        futureUrl: action.futureUrl,
      });

    default:
      return state;
  }
}

const LIKES_PLAYLIST_KEY = `likes${ AUTHED_PLAYLIST_SUFFIX }`;
const STREAM_PLAYLIST_KEY = `stream${ AUTHED_PLAYLIST_SUFFIX }`;

const initialState = {
  [LIKES_PLAYLIST_KEY]: { isFetching: false, items: [], nextUrl: null },
  [STREAM_PLAYLIST_KEY]: { isFetching: false, items: [], nextUrl: null },
}

export default function playlists(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_SONGS:
      return Object.assign({}, state, {
        [action.playlist]: playlist(state[action.playlist], action),
      });

    case types.RECEIVE_SONGS:
      return Object.assign({}, state, {
        [action.playlist]: playlist(state[action.playlist], action),
      });

    default:
      return state;
  }
}