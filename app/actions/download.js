export function startGameDownload(id) {
  return {
    type: 'START_DOWNLOAD',
    id
  };
}

export function finishGameDownload() {
  return {
    type: 'FINISH_DOWNLOAD'
  };
}

function setInitState(id, state) {
  const { isDownloading } = state.download;
  const isInstalled = localStorage.getItem(id) !== null || localStorage.getItem(id) !== undefined;

  return {
    type: 'SET_INIT_STATE',
    isDownloading,
    isInstalled
  };
}

export function setInitGameState(id) {
  return (dispatch, getState) =>
    dispatch(setInitState(id, getState()));
}
