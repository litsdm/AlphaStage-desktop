import callApi from '../utils/apiCaller';

export function addRedeemItemRequest(redeemItem, email, gameName) {
  return () =>
  callApi('privateinvite', 'post', {
    redeemItem,
    email,
    game: gameName
  });
}

export function redeemItemRequest(key, user) {
  return () =>
  callApi('redeem', 'post', {
    key,
    user
  });
}
