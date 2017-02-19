import callApi from '../utils/apiCaller';
import { addFeedback } from './feedback';

export const REQUEST_DEV_GAMES = 'REQUEST_DEV_GAMES';
export const RECEIVE_DEV_GAMES = 'RECEIVE_DEV_GAMES';

function requestDevGames() {
  return {
    type: REQUEST_DEV_GAMES
  }
}

function receiveDevGames(games) {
  return {
    type: RECEIVE_DEV_GAMES,
    games: games
  }
}

function fetchDevGames(id) {
  return dispatch => {
    dispatch(requestDevGames())
    return callApi(`games/from/${id}`).then(res => {
      res.games.forEach((game) => {
        dispatch(addFeedback(game.feedbacks));
        game.feedbacks = null;
      })
      dispatch(receiveDevGames(res.games));
    });
  }
}

function shouldFetchDevGames(state) {
  const games = state.devGame.items
  if (games.length == 0) {
    return true
  } else if (state.devGame.isFetching) {
    return false
  } else {
    return false
  }
}

export function fetchDevGamesIfNeeded(id) {
  return (dispatch, getState) => {
    if (shouldFetchDevGames(getState())) {
      return dispatch(fetchDevGames(id))
    }
  }
}
