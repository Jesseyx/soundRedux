import * as types from '../constants/ActionTypes';
import { constructUrl } from '../utils/RouteUtils';

export function changePath(route) {
  return {
    type: types.CHANGE_PATH,
    route,
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