// @flow
import update from 'react-addons-update';
import type { Action } from '../actions/types';
import type { Feedback } from '../utils/globalTypes';

export type feedbackState = {
  isFetching: boolean,
  items: Array<Feedback>
};

// Initial State
const initialState = { isFetching: false, items: [] };

export default function game(state: feedbackState = initialState, action: Action) {
  switch (action.type) {
    case 'ADD_FEEDBACK' :
      return {
        items: [...state.items, action.feedback],
      };

    case 'ADD_FEEDBACKS' :
      return {
        items: action.feedbacks,
      };

    case 'REQUEST_FEEDBACKS':
      return Object.assign({}, state, {
        isFetching: true
      });

    case 'RECEIVE_FEEDBACKS':
      return Object.assign({}, state, {
        isFetching: false,
        items: action.feedbacks,
      });

    case 'MARK_FEEDBACK':
      return update(state, {
        items: {
          [action.parentIndex]: {
            [action.childIndex]: {
              mark: { $set: action.mark }
            }
          }
        }
      });

    default:
      return state;
  }
}
