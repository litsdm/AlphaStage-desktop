import { START_DOWNLOAD, FINISH_DOWNLOAD, SET_INIT_IS_INSTALLED } from '../actions/download';

// Initial State
const initialState = { isDownloading: false, gameId: null, isInstalled: false };

export default function game(state = initialState, action: Object) {
  switch (action.type) {
    case SET_INIT_IS_INSTALLED:
      return {
        isInstalled: action.isInstalled
      }
    case START_DOWNLOAD :
      return {
        isDownloading: true,
        gameId: action.id
      };

    case FINISH_DOWNLOAD:
      return {
        isDownloading: false,
        gameId: null,
        isInstalled: true
      };

    default:
      return state;
  }
};
