import fetch from 'isomorphic-fetch';

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

export function addGames(games) {
  return {
    type: ADD_GAMES,
    games,
  };
}

function requestGames() {
  type: REQUEST_GAMES
}

function receiveGames(json) {
  return {
    type: RECEIVE_GAMES,
    games: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

function fetchGames() {
  return dispatch => {
    dispatch(requestGames())
    return fetch(`http://localhost:8080/api/games.json`)
      .then(response => response.json())
      .then(json => dispatch(receiveGames(json)))
  }
}

function shouldFetchGames(state) {
  const games = state.games
  if (!games) {
    return true
  } else if (games.isFetching) {
    return false
  } else {
    return false
  }
}

export function fetchGamesIfNeeded(subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchGames(getState())) {
      return dispatch(fetchGames())
    }
  }
}
