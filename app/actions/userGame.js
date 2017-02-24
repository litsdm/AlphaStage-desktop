import callApi from '../utils/apiCaller';

export const REQUEST_USER_GAMES = 'REQUEST_USER_GAMES';
export const RECEIVE_USER_GAMES = 'RECEIVE_USER_GAMES';

function requestUserGames() {
  return {
    type: REQUEST_USER_GAMES
  }
}

function receiveUserGames(games) {
  return {
    type: RECEIVE_USER_GAMES,
    games: games
  }
}

function fetchUserGames(id) {
  return dispatch => {
    dispatch(requestUserGames())
    return callApi(`games/from/${id}`).then(res => {
      dispatch(receiveUserGames(res.games));
    });
  }
}

function shouldFetchUserGames(state) {
  const games = state.userGame.items
  if (games.length == 0) {
    return true
  } else if (state.userGame.isFetching) {
    return false
  } else {
    return false
  }
}

export function fetchUserGamesIfNeeded(id) {
  return (dispatch, getState) => {
    if (shouldFetchUserGames(getState())) {
      return dispatch(fetchUserGames(id))
    }
  }
}
