// @flow
import type { Dispatch } from './types';

export function startGameDownload(id: string) {
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
  const isInstalled = localStorage.getItem(id) !== null;

  return {
    type: 'SET_INIT_STATE',
    isDownloading,
    isInstalled
  };
}

export function setInitGameState(id: string) {
  return (dispatch: Dispatch, getState: Function) =>
    dispatch(setInitState(id, getState()));
}

export function setIsInstalled(isInstalled: boolean) {
  return {
    type: 'SET_IS_INSTALLED',
    isInstalled
  };
}
