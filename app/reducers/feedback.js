import { ADD_FEEDBACK, ADD_FEEDBACKS, REQUEST_FEEDBACKS, RECEIVE_FEEDBACKS } from '../actions/feedback';

// Initial State
const initialState = { isFetching: false, items: [] };

export default function game(state = initialState, action: Object) {
  switch (action.type) {
    case ADD_FEEDBACK :
      return {
        items: [action.feedback, ...state.items],
      };

    case ADD_FEEDBACKS :
      return {
        items: action.feedbacks,
      };

    case REQUEST_FEEDBACKS:
      return Object.assign({}, state, {
        isFetching: true
      });

      case RECEIVE_FEEDBACKS:
        return Object.assign({}, state, {
          isFetching: false,
          items: action.feedbacks,
        });

    default:
      return state;
  }
};
