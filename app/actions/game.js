import callApi from '../utils/apiCaller';

export const ADD_GAME = 'ADD_GAME';
export const ADD_GAMES = 'ADD_GAMES';
export const REQUEST_GAMES = 'REQUEST_GAMES';
export const RECEIVE_GAMES = 'RECEIVE_GAMES';
export const DELETE_GAME = 'DELETE_GAME';

export function addGame(game) {
  return {
    type: ADD_GAME,
    game,
  };
}

export function addGameRequest(game) {
  return (dispatch) => {
    return callApi('games', 'post', {
      name: game.name,
      description: game.description,
      img: game.imgURL
    }).then(res => dispatch(addGame(game)));
  };
}

export function addGames(games) {
  return {
    type: ADD_GAMES,
    games,
  };
}

function requestGames() {
  return {
    type: REQUEST_GAMES
  }
}

function receiveGames(games) {
  return {
    type: RECEIVE_GAMES,
    games: games
  }
}

function fetchGames() {
  return dispatch => {
    dispatch(requestGames())
    return callApi('games').then(res => {
      dispatch(receiveGames(res));
    });
  }
}

function shouldFetchGames(state) {
  const games = state.game.items
  if (games.length == 0) {
    return true
  } else if (games.isFetching) {
    return false
  } else {
    return false
  }
}

export function fetchGamesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchGames(getState())) {
      return dispatch(fetchGames())
    }
  }
}

function fetchGame(id) {
  return (dispatch) => {
    dispatch(requestGames())
    return callApi(`games/${id}`).then(res => dispatch(addGame(res)));
  }
}

function shouldFetchGame(state, id) {
  for (var game of state.game.items) {
    if (game._id == id) {
      return false
    }
  }
  return true
}

export function fetchGameIfNeeded(id) {
  console.log("Fetching game: " + id);
  return (dispatch, getState) => {
    if (shouldFetchGame(getState(), id)) {
      return dispatch(fetchGame(id))
    }
  }
}
