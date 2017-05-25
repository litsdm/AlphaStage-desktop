// @flow
import callApi from '../utils/apiCaller';
import type { Dispatch } from './types';

type UserGame = {
  _id: string,
  img: string,
  name: string
};

function requestUserGames() {
  return {
    type: 'REQUEST_USER_GAMES'
  };
}

function receiveUserGames(games) {
  return {
    type: 'RECEIVE_USER_GAMES',
    games
  };
}

function addUserGame(game) {
  return {
    type: 'ADD_USER_GAME',
    game
  };
}

export function addGameToUserRequest(userId: string, game: UserGame) {
  return (dispatch: Dispatch, getState: Function) =>
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

export function fetchUserGamesIfNeeded(id: string) {
  return (dispatch: Dispatch, getState: Function) => {
    if (shouldFetchUserGames(getState())) {
      return dispatch(fetchUserGames(id));
    }
  };
}
