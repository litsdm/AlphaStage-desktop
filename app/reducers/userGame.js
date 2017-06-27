// @flow
import type { Action } from '../actions/types';
import type { Game } from '../utils/globalTypes';

export type userGameStateType = {
  isFetching: boolean,
  items: Array<Game>
};

// Initial State
const initialState = { isFetching: false, items: [] };

export default function userGame(state: userGameStateType = initialState, action: Action) {
  switch (action.type) {
    case 'REQUEST_USER_GAMES':
      return {
        ...state,
        isFetching: true
      };

    case 'RECEIVE_USER_GAMES':
      return {
        ...state,
        isFetching: false,
        items: action.games,
      };

    case 'ADD_USER_GAME':
      return {
        ...state,
        isFetching: false,
        items: [action.game, ...state.items]
      };

    default:
      return state;
  }
}
