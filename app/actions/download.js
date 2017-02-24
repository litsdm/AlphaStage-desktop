export const START_DOWNLOAD = 'START_DOWNLOAD';
export const FINISH_DOWNLOAD = 'FINISH_DOWNLOAD';
export const SET_INIT_IS_INSTALLED = 'SET_INIT_IS_INSTALLED';

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

export function setInitGameIsInstalled(id) {
  let isInstalled = localStorage.getItem(id) ? true : false
  return {
    type: SET_INIT_IS_INSTALLED,
    isInstalled
  }
}
