// @flow
import callApi from '../utils/apiCaller';
import { addFeedback } from './feedback';
import type { Dispatch } from './types';

export const REQUEST_DEV_GAMES = 'REQUEST_DEV_GAMES';

function requestDevGames() {
  return {
    type: 'REQUEST_DEV_GAMES'
  };
}

function receiveDevGames(games) {
  return {
    type: 'RECEIVE_DEV_GAMES',
    games
  };
}

function fetchDevGames(id) {
  return dispatch => {
    dispatch(requestDevGames());
    return callApi(`games/by/${id}`).then(res => {
      res.games.forEach((game) => {
        dispatch(addFeedback(game.feedbacks));
      });
      dispatch(receiveDevGames(res.games));
      return Promise.resolve(res);
    });
  };
}

function shouldFetchDevGames(state) {
  const games = state.devGame.items;
  if (games.length === 0) {
    return true;
  } else if (state.devGame.isFetching) {
    return false;
  }
  return false;
}

export function fetchDevGamesIfNeeded(id: string) {
  return (dispatch: Dispatch, getState: Function) => {
    if (shouldFetchDevGames(getState())) {
      return dispatch(fetchDevGames(id));
    }
  };
}
