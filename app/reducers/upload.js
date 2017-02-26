import { START_UPLOAD, FINISH_UPLOAD, RECEIVE_MAC_SIGNATURE, RECEIVE_WIN_SIGNATURE, REQUEST_SIGNATURE } from '../actions/upload';

// Initial State
const initialState = { isFetching: false, winURL: null, macURL: null, isUploading: false};

export default function userGame(state = initialState, action: Object) {

}
