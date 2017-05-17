// @flow
import update from 'react-addons-update';
import { ADD_GAME, ADD_GAMES, ADD_EDIT_GAME, REQUEST_GAMES, RECEIVE_GAMES, ALLOW_PLAYER } from '../actions/game';
import type { Game } from '../utils/globalTypes';

export type gameStateType = {
  isFetching: boolean,
  items: Array<Game>,
  editGame: ?Game
};
// Initial State
const initialState = { isFetching: false, items: [], editGame: null };

export default function game(state: gameStateType = initialState, action: Object) {
  switch (action.type) {
    case ADD_GAME :
      return {
        items: [action.game, ...state.items],
      };

    case ADD_GAMES :
      return {
        items: action.games,
      };

    case ADD_EDIT_GAME:
      return Object.assign({}, state, {
        editGame: action.game,
        isFetching: false
      });

    case REQUEST_GAMES:
      return Object.assign({}, state, {
        isFetching: true
      });

    case RECEIVE_GAMES:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.games,
      });

    case ALLOW_PLAYER:
      return update(state, {
        items: {
          [action.index]: {
            allowedPlayers: { $push: [action.user] }
          }
        }
      });

    default:
      return state;
  }
}
