import SC from 'soundcloud';
import Cookies from 'js-cookie';
import * as types from '../constants/ActionTypes';
import { CLIENT_ID } from '../constants/Config';

const COOKIE_PATH = 'accessToken';
const SC_API_URL = '//api.soundcloud.com';

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

function receiveAuthedUserPre(accessToken, user, shouldShowStream) {
  console.log(user);
  return dispatch => {
    dispatch(receiveAuthedUser(user));
  }
}

function receiveAuthedUser(user) {
  return {
    type: types.RECEIVE_AUTHED_USER,
    user
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