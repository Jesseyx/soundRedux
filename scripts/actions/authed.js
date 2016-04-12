import SC from 'soundcloud';
import { CLIENT_ID } from '../constants/Config';

export function loginUser(shouldShowStream = true) {
  return dispatch => {
    SC.initialize({
      client_id: CLIENT_ID,
      redirect_uri: `${ window.location.protocol }//${ window.location.host}/api/callback`
    });

    SC.connect().then(authObj => {
      console.log(authObj);
    })
    .catch(err => { throw err });
  }
}