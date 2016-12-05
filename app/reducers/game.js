import { ADD_GAME, ADD_GAMES, REQUEST_GAMES, RECEIVE_GAMES } from '../actions/game';

// Initial State
const initialState = { isFetching: false, items: [] };

export default function game(state = initialState, action: Object) {
  switch (action.type) {
    case ADD_GAME :
      return {
        items: [action.game, ...state.items],
      };

    case ADD_GAMES :
      return {
        items: action.games,
      };

    case REQUEST_GAMES:
      return Object.assign({}, state, {
        isFetching: true
      });

      case RECEIVE_GAMES:
        return Object.assign({}, state, {
          isFetching: false,
          items: action.games,
        });

    default:
      return state;
  }
};
