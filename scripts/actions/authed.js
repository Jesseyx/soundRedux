import SC from 'soundcloud';
import Cookies from 'js-cookie';
import { fetchSongs } from './playlists';
import * as types from '../constants/ActionTypes';
import { CLIENT_ID } from '../constants/Config';
import { AUTHED_PLAYLIST_SUFFIX } from '../constants/PlaylistConstants';

const COOKIE_PATH = 'accessToken';
const SC_API_URL = '//api.soundcloud.com';

export function initAuth() {
  return dispatch => {
    const accessToken = Cookies.get(COOKIE_PATH);
    if (accessToken) {
      return dispatch(authUser(accessToken, false));
    }
    return null;
  }
}

function authUser(accessToken, shouldShowStream = true) {
  return dispatch =>
    dispatch(fetchAuthedUser(accessToken, shouldShowStream));
}

function fetchAuthedUser(accessToken, shouldShowStream) {
  return dispatch =>
    fetch(`${ SC_API_URL }/me?oauth_token=${ accessToken }`)
      .then(response => response.json())
      .then(json => dispatch(receiveAuthedUserPre(accessToken, json, shouldShowStream)))
      .catch(err => { throw err });
}

function fetchStream(accessToken) {
  return dispatch => {
    dispatch(fetchSongs(
      `${ SC_API_URL }/me/activities/tracks/affiliated?limit=50&oauth_token=${ accessToken }`,
      `stream${ AUTHED_PLAYLIST_SUFFIX }`
    ))
  }
}

function receiveAuthedUserPre(accessToken, user, shouldShowStream) {
  console.log(user);
  return dispatch => {
    dispatch(receiveAuthedUser(user));
    dispatch(fetchStream(accessToken));
  }
}

function receiveAuthedUser(user) {
  return {
    type: types.RECEIVE_AUTHED_USER,
    user
  }
}

function resetAuthed() {
  return {
    type: types.RESET_AUTHED
  }
}

export function loginUser(shouldShowStream = true) {
  return dispatch => {
    SC.initialize({
      client_id: CLIENT_ID,
      redirect_uri: `${ window.location.protocol }//${ window.location.host}/api/callback`
    });

    SC.connect().then(authObj => {
      console.log(authObj);
      Cookies.set(COOKIE_PATH, authObj.oauth_token);
      dispatch(authUser(authObj.oauth_token, shouldShowStream));
    })
    .catch(err => { throw err });
  }
}

export function logoutUser() {
  return (dispatch, getState) => {
    Cookies.remove(COOKIE_PATH);
    return dispatch(resetAuthed());
  }
}