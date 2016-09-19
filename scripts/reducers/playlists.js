import merge from '../../node_modules/lodash/merge';
import * as types from '../constants/ActionTypes';
import { AUTHED_PLAYLIST_SUFFIX } from '../constants/PlaylistConstants';

// 当获取私有的播放列表时，state 为 undefined
const initialPlaylistState = {
    isFetching: false,
    items: [],
    nextUrl: null,
    futureUrl: null,
};

function playlist(state = initialPlaylistState, action) {
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

        case types.APPEND_LIKE:
            return Object.assign({}, state, {
                items: [action.songId, ...state.items],
            });

        case types.UNSHIFT_NEW_STREAM_SONGS:
            return Object.assign({}, state, {
                items: [...action.songs, ...state.items],
            });

        case types.REMOVE_UNLIKED_SONGS:
            return Object.assign({}, state, {
                items: [...action.songs],
            });

        default:
            return state;
    }
}

const LIKES_PLAYLIST_KEY = `likes${ AUTHED_PLAYLIST_SUFFIX }`;
const STREAM_PLAYLIST_KEY = `stream${ AUTHED_PLAYLIST_SUFFIX }`;

// 下面的 state 是不是要加上 futureUrl?
const initialState = {
    [LIKES_PLAYLIST_KEY]: { isFetching: false, items: [], nextUrl: null, },
    [STREAM_PLAYLIST_KEY]: { isFetching: false, items: [], nextUrl: null, },
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

        case types.APPEND_LIKE:
            return Object.assign({}, state, {
                [LIKES_PLAYLIST_KEY]: playlist(state[LIKES_PLAYLIST_KEY], action)
            });

        case types.UNSHIFT_NEW_STREAM_SONGS:
            return Object.assign({}, state, {
                [STREAM_PLAYLIST_KEY]: playlist(state[STREAM_PLAYLIST_KEY], action),
            });

        case types.REMOVE_UNLIKED_SONGS:
            return Object.assign({}, state, {
                [LIKES_PLAYLIST_KEY]: playlist(state[LIKES_PLAYLIST_KEY], action),
            });

        default:
            return state;
    }
}
