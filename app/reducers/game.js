import { ADD_GAME, ADD_GAMES, DELETE_GAME } from '../actions/game';

// Initial State
const initialState = { data: [] };

export default function game(state = initialState, action) {
  switch (action.type) {
    case ADD_GAME :
      return {
        data: [action.game, ...state.data],
      };

    case ADD_GAMES :
      return {
        data: action.games,
      };

    default:
      return state;
  }
};
