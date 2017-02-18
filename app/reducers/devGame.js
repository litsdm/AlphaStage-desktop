import { REQUEST_DEV_GAMES, RECEIVE_DEV_GAMES } from '../actions/devGame';

// Initial State
const initialState = { isFetching: false, items: [] };

export default function devGame(state = initialState, action: Object) {
  switch (action.type) {
    case REQUEST_DEV_GAMES:
      return Object.assign({}, state, {
        isFetching: true
      });

      case RECEIVE_DEV_GAMES:
        return Object.assign({}, state, {
          isFetching: false,
          items: action.games,
        });

    default:
      return state;
  }
};
