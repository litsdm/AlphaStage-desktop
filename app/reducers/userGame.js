import { REQUEST_USER_GAMES, RECEIVE_USER_GAMES } from '../actions/userGame';

// Initial State
const initialState = { isFetching: false, items: [] };

export default function userGame(state = initialState, action: Object) {
  switch (action.type) {
    case REQUEST_USER_GAMES:
      return Object.assign({}, state, {
        isFetching: true
      });

    case RECEIVE_USER_GAMES:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.games,
      });

    default:
      return state;
  }
};
