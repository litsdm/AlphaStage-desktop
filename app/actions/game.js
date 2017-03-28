import callApi from '../utils/apiCaller';

export const ADD_GAME = 'ADD_GAME';
export const ADD_GAMES = 'ADD_GAMES';
export const ADD_EDIT_GAME = 'ADD_EDIT_GAME';
export const REQUEST_GAMES = 'REQUEST_GAMES';
export const RECEIVE_GAMES = 'RECEIVE_GAMES';
export const DELETE_GAME = 'DELETE_GAME';
export const ALLOW_PLAYER = 'ALLOW_PLAYER';

export function addGame(game) {
  return {
    type: ADD_GAME,
    game,
  };
}

export function addGameRequest(game) {
  return (dispatch) => {
    return callApi('games', 'post', {
      game: {
        name: game.name,
        description: game.description,
        img: game.img,
        backgroundImg: game.backgroundImg,
        availableOn: game.availableOn,
        videoLinks: game.videoLinks,
        galleryLinks: game.galleryLinks,
        developer: game.developer,
        winBuildURL: game.winBuildURL,
        macBuildURL: game.macBuildURL,
        macFilename: game.macFilename,
        winFilename: game.winFilename,
        winExe: game.winExe,
        isPrivate: game.isPrivate,
        allowedPlayers: [game.developer]
      }
    }).then(res => dispatch(addGame(res.game)));
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
  return (dispatch, getState) => {
    if (shouldFetchGame(getState(), id)) {
      return dispatch(fetchGame(id))
    }
  }
}

export function fetchEditGameIfNeeded(id) {
  return (dispatch, getState) => {
    if (shouldFetchEditGame(getState(), id)) {
      return dispatch(fetchEditGame(id))
    }
  }
}

function shouldFetchEditGame(state, id) {
  if (state.game.editGame) {
    return state.game.editGame._id === id
  }
  return true
}

function fetchEditGame(id) {
  return dispatch => {
    dispatch(requestGames())
    return callApi(`games/${id}`).then(res => dispatch(addEditGame(res)));
  }
}

function addEditGame(game) {
  return {
    type: ADD_EDIT_GAME,
    game
  }
}

export function editGameRequest(game, id) {
  return dispatch => {
    return callApi(`games/${id}`, 'put', { game })
  }
}

export function allowPlayer(index, user) {
  return {
    type: ALLOW_PLAYER,
    index,
    user
  }
}
