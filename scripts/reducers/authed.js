import * as types from '../constants/ActionTypes';

const initialState = {
  accessToken: null,
  user: null,
  likes: {},
  playlists: [],
  followings: {},
}

export default function authed(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_ACCESS_TOKEN:
      return Object.assign({}, state, {
        accessToken: action.accessToken
      });

    case types.RECEIVE_AUTHED_USER:
      return Object.assign({}, state, {
        user: action.user
      });

    case types.RESET_AUTHED:
      return Object.assign({}, initialState);

    case types.RECEIVE_LIKES:
      return Object.assign({}, state, {
        likes: action.likes,
      });

    case types.RECEIVE_AUTHED_PLAYLISTS:
      return Object.assign({}, state, {
        playlists: action.playlists,
      });

    case types.RECEIVE_AUTHED_FOLLOWINGS:
      return Object.assign({}, state, {
        followings: action.users,
      });

    default:
      return state;
  }
}