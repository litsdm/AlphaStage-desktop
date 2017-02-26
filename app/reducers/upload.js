import { START_UPLOAD, FINISH_UPLOAD, RECEIVE_MAC_SIGNATURE, RECEIVE_WIN_SIGNATURE, REQUEST_SIGNATURE } from '../actions/upload';

// Initial State
const initialState = { isFetching: false, winURL: null, macURL: null, isUploading: false};

export default function userGame(state = initialState, action: Object) {
  switch (action.type) {
    case START_UPLOAD:
      return Object.assign({}, state, {
        isUploading: true
      });

    case FINISH_UPLOAD:
      return Object.assign({}, state, {
        isUploading: false
      });

    case REQUEST_SIGNATURE:
      return Object.assign({}, state, {
        isFetching: true
      });

    case RECEIVE_MAC_SIGNATURE:
      return Object.assign({}, state, {
        isFetching: false,
        macURL: action.url
      });

    case RECEIVE_WIN_SIGNATURE:
      return Object.assign({}, state, {
        isFetching: false,
        winURL: action.url
      });

    default:
      return state;
  }
}
