// @flow
import callApi from '../utils/apiCaller';

export function addRedeemItemRequest(redeemItem: string, email: string, gameName: string) {
  return () =>
  callApi('privateinvite', 'post', {
    redeemItem,
    email,
    game: gameName
  });
}

export function redeemItemRequest(key: string, user: string) {
  return () =>
  callApi('redeem', 'post', {
    key,
    user
  });
}
