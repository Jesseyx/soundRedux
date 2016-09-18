import SC from 'soundcloud';
import Cookies from 'js-cookie';
import { normalize, arrayOf } from 'normalizr';
import { fetchSongs } from './playlists';
import * as types from '../constants/ActionTypes';
import { CLIENT_ID } from '../constants/Config';
import { AUTHED_PLAYLIST_SUFFIX } from '../constants/PlaylistConstants';
import { songSchema, userSchema, playlistSchema } from '../constants/Schemes';
import { receiveSongs } from '../actions/playlists';
import { SC_API_URL } from '../constants/Api';
import { changePlayingSong } from '../actions/player';

const COOKIE_PATH = 'accessToken';

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

function fetchLikes(accessToken) {
  return dispatch =>
    fetch(`${ SC_API_URL }/me/favorites?oauth_token=${ accessToken }`)
      .then(response => response.json())
      .then(json => {
        console.log('*********************** fetchLinks ***********************');
        console.log(json);
        const songs = json.filter(song => song.streamable);
        const normalized = normalize(songs, arrayOf(songSchema));
        console.log('*********************** fetchLinks Normailizr ***********************');
        console.log(normalized);
        const likes = normalized.result
          .reduce((obj, songId) => Object.assign({}, obj, { [songId]: 1 }), {});
        dispatch(receiveLikes(likes));
        dispatch(receiveSongs(
          normalized.entities,
          normalized.result,
          `likes${ AUTHED_PLAYLIST_SUFFIX }`,
          null
        ));
      })
      .catch(err => { throw err; })
}

function fetchPlaylists(accessToken) {
  return dispatch =>
    fetch(`${ SC_API_URL }/me/playlists?oauth_token=${ accessToken }`)
      .then(response => response.json())
      .then(json => {
        console.log('*********************** fetchPlaylists ***********************');
        console.log(json);
        const normalized = normalize(json, arrayOf(playlistSchema));
        console.log('*********************** fetchPlaylists normalized ***********************');
        console.log(normalized);
        dispatch(receiveAuthedPlaylists(normalized.result, normalized.entities));
        normalized.result.forEach(playlistId => {
          const playlist = normalized.entities.playlists[playlistId];
          dispatch(receiveSongs(
            {},
            playlist.tracks,
            playlist.title + AUTHED_PLAYLIST_SUFFIX,
            null
          ))
        })
      })
      .catch(err => { throw err; })
}

function fetchFollowings(accessToken) {
  return dispatch =>
    fetch(`${ SC_API_URL }/me/followings?oauth_token=${ accessToken }`)
      .then(response => response.json())
      .then(json => {
        console.log('*********************** fetchFollowings ***********************');
        console.log(json);
        return normalize(json.collection, arrayOf(userSchema));
      })
      .then(normalized => {
        console.log('*********************** fetchFollowings normalized ***********************');
        console.log(normalized);

        const users = normalized.result
          .reduce((obj, userId) => Object.assign({}, obj, { [userId]: 1, }), {});
        dispatch(receiveAuthedFollowings(users, normalized.entities));
      })
      .catch(err => { throw err; })
}

function receiveAuthedUserPre(accessToken, user, shouldShowStream) {
  console.log(user);
  return dispatch => {
    dispatch(receiveAccessToken(accessToken));
    dispatch(receiveAuthedUser(user));
    dispatch(fetchStream(accessToken));
    dispatch(fetchLikes(accessToken));
    dispatch(fetchPlaylists(accessToken));
    dispatch(fetchFollowings(accessToken));
    if (shouldShowStream) {
      //
    }
  }
}

function receiveAccessToken(accessToken) {
  return {
    type: types.RECEIVE_ACCESS_TOKEN,
    accessToken,
  }
}

function receiveAuthedUser(user) {
  return {
    type: types.RECEIVE_AUTHED_USER,
    user,
  }
}

function resetAuthed() {
  return {
    type: types.RESET_AUTHED,
  }
}

function receiveLikes(likes) {
  return {
    type: types.RECEIVE_LIKES,
    likes,
  }
}

function receiveAuthedPlaylists(playlists, entities) {
  return {
    type: types.RECEIVE_AUTHED_PLAYLISTS,
    playlists,
    entities,
  }
}

function receiveAuthedFollowings(users, entities) {
  return {
    type: types.RECEIVE_AUTHED_FOLLOWINGS,
    users,
    entities
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

export function toggleLike(songId) {
    return (dispatch, getState) => {
        const { authed, player } = getState();
        const { likes } = authed;
        const { selectedPlaylists, currentSongIndex } = player;
        const liked = songId in likes && likes[songId] === 1 ? 0 : 1;

        if (!(songId in likes)) {
            // 收藏列表中无该 id, 添加到本地状态中， 这里是添加到 playlists 中
            dispatch(appendLike(songId));
            if (currentSongIndex !== null
                && selectedPlaylists[selectedPlaylists.length - 1] === `likes${ AUTHED_PLAYLIST_SUFFIX }`) {
                dispatch(changePlayingSong(currentSongIndex + 1));
            }
        }

        // 这个是添加到 authed 中
        dispatch(setLike(songId, liked));
        syncLike(authed.accessToken, songId, liked);
    }
}

function appendLike(songId) {
    return {
        type: types.APPEND_LIKE,
        songId,
    }
}

function setLike(songId, liked) {
    return {
        type: types.SET_LIKE,
        liked,
        songId,
    }
}

function syncLike(accessToken, songId, liked) {
    fetch(
        `${ SC_API_URL }/me/favorites/${ songId }?oauth_token=${ accessToken }`,
        { method: liked ? 'put' : 'delete' }
    );
}

export function toggleFollow(userId) {
    return (dispatch, getState) => {
        const { authed } = getState();
        const { followings } = authed;
        const following = userId in followings && followings[userId] === 1 ? 0 : 1;

        dispatch(setFollowing(userId, following));
        syncFollowing(authed.accessToken, userId, following);
    }
}

function setFollowing(userId, following) {
    return {
        type: types.SET_FOLLOWING,
        following,
        userId,
    }
}

function syncFollowing(accessToken, userId, following) {
    fetch(
        `${ SC_API_URL }/me/followings/${ userId }?oauth_token=${ accessToken }`,
        { method: following ? 'put' : 'delete' }
    );
}

export function addNewStreamSongsToPlaylist() {
    return (dispatch, getState) => {
        const { authed } = getState();
        dispatch(unshiftNewStreamSongs(authed.newStreamSongs.slice()));
    }
}

function unshiftNewStreamSongs(songs) {
    return {
        type: types.UNSHIFT_NEW_STREAM_SONGS,
        songs,
    }
}
