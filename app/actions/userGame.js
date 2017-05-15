import callApi from '../utils/apiCaller';

export const REQUEST_USER_GAMES = 'REQUEST_USER_GAMES';
export const RECEIVE_USER_GAMES = 'RECEIVE_USER_GAMES';
export const ADD_USER_GAME = 'ADD_USER_GAME';

function requestUserGames() {
  return {
    type: REQUEST_USER_GAMES
  };
}

function receiveUserGames(games) {
  return {
    type: RECEIVE_USER_GAMES,
    games
  };
}

function addUserGame(game) {
  return {
    type: ADD_USER_GAME,
    game
  };
}

export function addGameToUserRequest(userId, game) {
  return (dispatch, getState) =>
  callApi('games/downloaded', 'post', {
    userId,
    gameId: game._id
  }).then(res => {
    const state = getState();
    const games = state.userGame.items;
    if (games.length !== 0) {
      return dispatch(addUserGame(game));
    }
    return res;
  });
}

function fetchUserGames(id) {
  return dispatch => {
    dispatch(requestUserGames());
    return callApi(`games/from/${id}`).then(res =>
      dispatch(receiveUserGames(res.games))
    );
  };
}

function shouldFetchUserGames(state) {
  const games = state.userGame.items;
  if (games.length === 0) {
    return true;
  } else if (state.userGame.isFetching) {
    return false;
  }
}

export function fetchUserGamesIfNeeded(id) {
  return (dispatch, getState) => {
    if (shouldFetchUserGames(getState())) {
      return dispatch(fetchUserGames(id));
    }
  };
}
