import callApi from '../utils/apiCaller';
import { callUploadApi, callDownloadApi } from '../utils/uploadApiCaller';

export const ADD_GAMEPLAY = 'ADD_GAMEPLAY';
export const ADD_GAMEPLAYS = 'ADD_GAMEPLAYS';
export const REQUEST_GAMEPLAYS = 'REQUEST_GAMEPLAYS';
export const RECEIVE_GAMEPLAYS = 'RECEIVE_GAMEPLAYS';
export const DELETE_GAMEPLAY = 'DELETE_GAMEPLAY';

export function uploadFileRequest(formData, gameplay) {
  return (dispatch) => {
    return callUploadApi('upload', 'post', formData).then(res => dispatch(addGameplayRequest(gameplay)));
  }
}

export function downloadFileRequest(key) {
  return (dispatch) => {
    return callDownloadApi('download', {
      key: key
    });
  }
}

export function addGameplay(gameplay) {
  return {
    type: ADD_GAMEPLAY,
    gameplay,
  };
}

export function addGameplayRequest(gameplay) {
  return (dispatch) => {
    return callApi('gameplays', 'post', {
      gameplay: {
        s3URL: gameplay.s3URL,
        gameId: gameplay.gameId,
        createdAt: gameplay.createdAt
      }
    }).then(dispatch(addGameplay(res.gameplay)));
  };
}

export function addGameplays(gameplays) {
  return {
    type: ADD_GAMEPLAYS,
    gameplays,
  };
}

function requestGameplays() {
  return {
    type: REQUEST_GAMEPLAYS
  }
}

function receiveGameplays(gameplays) {
  return {
    type: RECEIVE_GAMEPLAYS,
    gameplays: gameplays
  }
}

function fetchGameplays() {
  return dispatch => {
    dispatch(requestGameplays())
    return callApi('gameplays').then(res => {
      dispatch(receiveGameplays(res));
    });
  }
}

function shouldFetchGameplays(state) {
  const gameplays = state.gameplay.items
  if (gameplays.length == 0) {
    return true
  } else if (gameplays.isFetching) {
    return false
  } else {
    return false
  }
}

export function fetchGameplaysIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchGameplays(getState())) {
      return dispatch(fetchGameplays())
    }
  }
}
