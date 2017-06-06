// @flow
import type { Action } from '../actions/types';

export type uploadStateType = {
  isFetching: boolean,
  winURL: ?string,
  macURL: ?string,
  macName: ?string,
  winName: ?string,
  isUploading: boolean
};

// Initial State
const initialState = {
  isFetching: false,
  winURL: null,
  macURL: null,
  macName: null,
  winName: null,
  isUploading: false
};

export default function userGame(state: uploadStateType = initialState, action: Action) {
  switch (action.type) {
    case 'START_UPLOAD':
      return Object.assign({}, state, {
        isUploading: true
      });

    case 'FINISH_UPLOAD':
      return Object.assign({}, state, {
        isUploading: false
      });

    case 'REQUEST_SIGNATURE':
      return Object.assign({}, state, {
        isFetching: true
      });

    case 'RECEIVE_MAC_SIGNATURE':
      return Object.assign({}, state, {
        isFetching: false,
        macURL: action.url,
        macName: action.filename
      });

    case 'RECEIVE_WIN_SIGNATURE':
      return Object.assign({}, state, {
        isFetching: false,
        winURL: action.url,
        winName: action.filename
      });

    case 'RECEIVE_VIDEO_SIGNATURE':
      return Object.assign({}, state, {
        isFetching: false
      });

    default:
      return state;
  }
}
