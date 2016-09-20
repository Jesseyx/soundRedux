import { normalize, arrayOf } from 'normalizr';
import { merge } from 'lodash';

import * as types from '../constants/ActionTypes';
import {
    constructUserUrl,
    constructUserTracksUrl,
    constructUserFollowingsUrl,
    constructUserProfilesUrl,
} from '../utils/UserUtils';
import { userSchema, songSchema } from '../constants/Schemes';
import { receiveSongs } from '../actions/playlists';
import { USER_PLAYLIST_SUFFIX } from '../constants/PlaylistConstants';

export function fetchUserIfNeeded(userId) {
    return (dispatch, getState) => {
        const { entities } = getState();
        const { users } = entities;

        if (!(userId in users) || !users[userId].description) {
            return dispatch(fetchUser(userId));
        } else if (!('followings' in users[userId])) {
            return dispatch(fetchUserData(userId, users[userId].username));
        }

        return null;
    }
}

function fetchUser(userId) {
    return dispatch => {
        dispatch(requestUser(userId));

        return fetch(constructUserUrl(userId))
            .then(response => response.json())
            .then(json => {
                const normalized = normalize(json, userSchema);
                dispatch(receiveUserPre(userId, normalized.entities));
            })
            .catch(err => { throw err; })
    }
}

export function requestUser(userId) {
    return {
        type: types.REQUEST_USER,
        userId,
    }
}

function receiveUserPre(userId, entities) {
    return dispatch => {
        dispatch(receiveUser(entities));
        dispatch(fetchUserData(userId, entities.users[userId].username));
    }
}

export function receiveUser(entities) {
    return {
        type: types.RECEIVE_USER,
        entities,
    }
}

function fetchUserData(userId, username) {
    return dispatch => {
        // 一系列操作
        dispatch(fetchUserTracks(userId, username));
        dispatch(fetchUserFollowings(userId));
        dispatch(fetchUserProfiles(userId));
    }
}

function fetchUserTracks(userId, username) {
    return dispatch => fetch(constructUserTracksUrl(userId))
        .then(response => response.json())
        .then(json => {
            const normalized = normalize(json, arrayOf(songSchema));
            dispatch(receiveSongs(
                normalized.entities,
                normalized.result,
                username + USER_PLAYLIST_SUFFIX,
                null,
            ))
        })
        .catch(err => { throw err; })
}

function fetchUserFollowings(userId) {
    return dispatch => fetch(constructUserFollowingsUrl(userId))
        .then(response => response.json())
        .then(json => {
            const users = json.collection.sort((a, b) => b.followers_count - a.followers_count);
            const normalized = normalize(users, arrayOf(userSchema));

            const entities = merge({}, normalized.entities, {
                users: {
                    [userId]: { followings: normalized.result },
                }
            })

            dispatch(receiveUserFollowings(entities));
        })
        .catch(err => { throw err; })
}

export function receiveUserFollowings(entities) {
    return {
        type: types.RECEIVE_USER_FOLLOWINGS,
        entities,
    }
}

function fetchUserProfiles(userId) {
    return dispatch => fetch(constructUserProfilesUrl(userId))
        .then(response => response.json())
        .then(json => {
            const entities = { users: { [userId]: { profiles: json } } };
            dispatch(receiveUserProfiles(entities));

            console.group('-------------------------------------');
            console.log(entities);
            console.groupEnd();
        })
        .catch(err => { throw err; })
}

export function receiveUserProfiles(entities) {
    return {
        type: types.RECEIVE_USER_PROFILES,
        entities,
    }
}
