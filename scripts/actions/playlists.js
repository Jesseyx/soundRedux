import { normalize, arrayOf } from 'normalizr';

import * as types from '../constants/ActionTypes';
import { songSchema } from '../constants/Schemes';
import { GENRES_MAP } from '../constants/SongConstants';
import { constructUrl } from '../utils/SongUtils';
import { AUTHED_PLAYLIST_SUFFIX } from '../constants/PlaylistConstants';
import { getPlayingPlaylist } from '../utils/PlayerUtils';
import { changePlayingSong } from '../actions/player';

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

                const normalized = normalize(songs, arrayOf(songSchema));
                console.log(normalized);
                // 感觉就是去重的，但是我试了下貌似没有重复的
                const result = normalized.result.reduce((arr, songId) => {
                    if (arr.indexOf(songId) === -1) {
                        arr.push(songId);
                    }

                    return arr;
                }, []);

                dispatch(receiveSongs(normalized.entities, result, playlist, nextUrl, futureUrl));
            })
            .catch(err => { throw err; })
    }
}

function requestSongs(playlist) {
    return {
        type: types.REQUEST_SONGS,
        playlist,
    }
}

export function receiveSongs(entities, songs, playlist, nextUrl, futureUrl) {
    return {
        type: types.RECEIVE_SONGS,
        entities,
        songs,
        playlist,
        nextUrl,
        futureUrl,
    }
}

export function fetchSongsIfNeeded(playlist) {
    return (dispatch, getState) => {
        const { playlists } = getState();

        if (shouldFetchSongs(playlists, playlist)) {
            const nextUrl = getNextUrl(playlists, playlist);
            console.log(nextUrl);
            return dispatch(fetchSongs(nextUrl, playlist));
        }

        return null;
    }
}

function shouldFetchSongs(playlists, playlist) {
    const activePlaylist = playlists[playlist];

    if (!activePlaylist || !activePlaylist.isFetching && (activePlaylist.nextUrl !== null)) {
        return true;
    }

    return false;
}

function getNextUrl(playlists, playlist) {
    const activePlaylist = playlists[playlist];

    if (!activePlaylist || activePlaylist.nextUrl === null) {
        return constructUrl(playlist);
    }

    return activePlaylist.nextUrl;
}

export function removeUnlikedSongsPre() {
    return (dispatch, getState) => {
        const LIKES_PLAYLIST_KEY = `likes${ AUTHED_PLAYLIST_SUFFIX }`;
        const { authed, player, playlists } = getState();
        const { currentSongIndex } = player;
        const playingPlaylist = getPlayingPlaylist(player);

        const likedSongs = playlists[LIKES_PLAYLIST_KEY].items
            .filter(songId => songId in authed.likes && authed.likes[songId] === 1);

        if (playingPlaylist === LIKES_PLAYLIST_KEY
            && currentSongIndex >= likedSongs.length) {
            dispatch(changePlayingSong(null));
        }

        dispatch(removeUnlikedSongs(likedSongs));
    }
}

function removeUnlikedSongs(songs) {
    return {
        type: types.REMOVE_UNLIKED_SONGS,
        songs,
    }
}
