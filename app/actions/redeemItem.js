import callApi from '../utils/apiCaller';
import { allowPlayer } from './game';

export function addRedeemItemRequest(redeemItem, email, gameName) {
  return dispatch => {
    return callApi('privateinvite', 'post', {
      redeemItem,
      email,
      game: gameName
    });
  }
}

export function redeemItemRequest (key, user) {
  return (dispatch, getState) => {
    return callApi('redeem', 'post', {
      key,
      user
    });
  }
}
