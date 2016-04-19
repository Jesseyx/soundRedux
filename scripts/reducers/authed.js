import * as types from '../constants/ActionTypes';

const initialState = {
  user: null,
  likes: {},
}

export default function authed(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_AUTHED_USER:
      return Object.assign({}, state, {
        user: action.user
      })

    case types.RESET_AUTHED:
      return Object.assign({}, initialState)

    case types.RECEIVE_LIKES:
      return Object.assign({}, state, {
        likes: action.likes,
      })

    default:
      return state
  }
}