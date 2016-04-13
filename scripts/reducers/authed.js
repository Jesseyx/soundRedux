import * as types from '../constants/ActionTypes';

const initialState = {
  user: null
}

export default function authed(state = initialState, action) {
  switch (action.type) {
    case types.RECEIVE_AUTHED_USER:
      return Object.assign({}, state, {
        user: action.user
      })

    case types.RESET_AUTHED:
      return Object.assign({}, initialState)

    default:
      return state
  }
}