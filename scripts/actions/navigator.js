import * as types from '../constants/ActionTypes';
import { constructUrl, parseUrl } from '../utils/RouteUtils';

export function initNavigator() {
    return dispatch => {
        window.onpopstate = e => {
            dispatch(navigateBack(e))
        }

        if (window.location.hash !== '') {
            dispatch(navigateTo(parseUrl(window.location.hash)))
        }
    }
}

export function navigateBack(e) {
    console.log('navigateBack: ');
    console.log(e);
    return dispatch => {
        if (e.state) {
            return dispatch(navigateTo(e.state.route, false));
        }

        return null;
    }
}

export function navigateTo(route, shouldPushState = true) {
    console.log(route);
    return (dispatch, getState) => {
        const { navigator } = getState();
        if (constructUrl(route) === constructUrl(navigator.route)) {
            return null;
        }

        if (shouldPushState) {
            pushState(route);
        }

        return dispatch(changePath(route));
    }
}

function pushState(route) {
    history.pushState({ route }, '', `#/${ constructUrl(route) }`);
}

export function changePath(route) {
    return {
        type: types.CHANGE_PATH,
        route,
    }
}
