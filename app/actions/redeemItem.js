import callApi from '../utils/apiCaller';

export function addRedeemItemRequest(redeemItem, email, gameName) {
  return dispatch => {
    return callApi('privateinvite', 'post', {
      redeemItem,
      email,
      game: gameName
    })
  }
}
