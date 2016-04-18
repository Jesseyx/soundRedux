import { normalize, arrayOf } from 'normalizr';
import * as types from '../constants/ActionTypes';
import { GENRES_MAP } from '../constants/SongConstants';

export function fetchSongs(url, playlist) {
  return (dispatch, getState) => {
    const { authed } = getState();
    dispatch(requestSongs(playlist));

    return fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        let nextUrl = null;
        let futureUrl = null;
        if (json.next_href) {
          nextUrl = json.next_href;
          nextUrl += (authed.accessToken ? `&oauth_token=${ authed.accessToken }` : '');
        }

        if (json.future_href) {
          futureUrl = json.future_href;
          futureUrl += (authed.accessToken ? `&oauth_token=${ authed.accessToken }` : '');
        }

        const songs = json.collection
          .map(song => song.origin ? song.origin : song)
          .filter(song => {
            if (playlist in GENRES_MAP) {
              return song.streamable && song.kind === 'track' && song.duration < 600000;
            }
            // 筛选出种类等于轨道唱片的，因为 collection 包括列表
            return song.streamable && song.kind === 'track';
          });
        
      })
  }
}

function requestSongs(playlist) {
  return {
    type: types.REQUEST_SONGS,
    playlist
  }
}