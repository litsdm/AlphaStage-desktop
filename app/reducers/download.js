// @flow
import type { Action } from '../actions/types';

export type downloadStateType = {
  isDownloading: boolean,
  gameId: ?string,
  isInstalled: boolean
};

// Initial State
const initialState = { isDownloading: false, gameId: null, isInstalled: false };

export default function download(state: downloadStateType = initialState, action: Action) {
  switch (action.type) {
    case 'SET_INIT_STATE':
      return Object.assign({}, state, {
        isInstalled: action.isInstalled,
        isDownloading: action.isDownloading,
      });
    case 'START_DOWNLOAD' :
      return Object.assign({}, state, {
        isDownloading: true,
        gameId: action.id
      });
    case 'FINISH_DOWNLOAD':
      return Object.assign({}, state, {
        isDownloading: false,
        gameId: null,
        isInstalled: true
      });

    default:
      return state;
  }
}
