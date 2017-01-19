import { ADD_GAMEPLAY, ADD_GAMEPLAYS, REQUEST_GAMEPLAYS, RECEIVE_GAMEPLAYS } from '../actions/gameplay';

// Initial State
const initialState = { isFetching: false, items: [] };

export default function game(state = initialState, action: Object) {
  switch (action.type) {
    case ADD_GAMEPLAY :
      return {
        items: [action.gameplay, ...state.items],
      };

    case ADD_GAMEPLAYS :
      return {
        items: action.gameplays,
      };

    case REQUEST_GAMEPLAYS:
      return Object.assign({}, state, {
        isFetching: true
      });

      case RECEIVE_GAMEPLAYS:
        return Object.assign({}, state, {
          isFetching: false,
          items: action.gameplays,
        });

    default:
      return state;
  }
};
