// @flow
import type { Action } from '../actions/types';
import type { DevGame } from '../utils/globalTypes';

export type devGameStateType = {
  isFetching: boolean,
  items: Array<DevGame>
};

// Initial State
const initialState = { isFetching: false, items: [] };

export default function devGame(state: devGameStateType = initialState, action: Action) {
  switch (action.type) {
    case 'REQUEST_DEV_GAMES':
      return Object.assign({}, state, {
        isFetching: true
      });

    case 'RECEIVE_DEV_GAMES':
      return Object.assign({}, state, {
        isFetching: false,
        items: action.games,
      });

    default:
      return state;
  }
}
