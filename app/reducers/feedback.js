import { ADD_FEEDBACK, ADD_FEEDBACKS, REQUEST_FEEDBACKS, RECEIVE_FEEDBACKS, MARK_FEEDBACK } from '../actions/feedback';
import update from 'react-addons-update';

// Initial State
const initialState = { isFetching: false, items: [] };

export default function game(state = initialState, action: Object) {
  switch (action.type) {
    case ADD_FEEDBACK :
      return {
        items: [...state.items, action.feedback],
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

    case MARK_FEEDBACK:
      return update(state, {
        items: {
          [action.parentIndex]: {
            [action.childIndex]: {
              mark: { $set: action.mark }
            }
          }
        }
      })

    default:
      return state;
  }
};
