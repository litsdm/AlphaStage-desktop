// @flow
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

export function setIsInstalled(id: string) {
  const isInstalled = localStorage.getItem(id) !== null;

  return {
    type: 'SET_IS_INSTALLED',
    isInstalled
  };
}
