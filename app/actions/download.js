export const START_DOWNLOAD = 'START_DOWNLOAD';
export const FINISH_DOWNLOAD = 'FINISH_DOWNLOAD';
export const SET_INIT_STATE = 'SET_INIT_STATE';

export function startGameDownload(id) {
  return {
    type: START_DOWNLOAD,
    id
  }
}

export function finishGameDownload() {
  return {
    type: FINISH_DOWNLOAD
  }
}

function setInitState(id, state) {
  const { isDownloading } = state.download;
  let isInstalled = localStorage.getItem(id) ? true : false;

  return {
    type: SET_INIT_STATE,
    isDownloading,
    isInstalled
  }
}

export function setInitGameState(id) {
  return (dispatch, getState) => {
    return dispatch(setInitState(id, getState()));
  }
}
