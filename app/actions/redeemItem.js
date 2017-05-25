// @flow
import callApi from '../utils/apiCaller';

type RedeemItem = {
  type: string,
  item: string
};

export function addRedeemItemRequest(redeemItem: RedeemItem, email: string, gameName: string) {
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
