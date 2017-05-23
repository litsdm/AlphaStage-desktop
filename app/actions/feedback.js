// @flow
import callApi from '../utils/apiCaller';
import type { Dispatch } from './types';
import type { Feedback, Gameplay } from '../utils/globalTypes';

export function markFeedbackRequest(
  feedbackId: string,
  mark: number,
  childIndex: number,
  parentIndex: number
) {
  return (dispatch: Dispatch) =>
    callApi('feedbacks/mark', 'post', {
      feedbackId,
      mark
    }).then(() => dispatch(markFeedback(childIndex, parentIndex, mark)));
}

function markFeedback(childIndex, parentIndex, mark) {
  return {
    type: 'MARK_FEEDBACK',
    childIndex,
    parentIndex,
    mark
  };
}

export function addFeedback(feedback: Feedback) {
  return {
    type: 'ADD_FEEDBACK',
    feedback,
  };
}

export function addGameplayRequest(feedback: Feedback, gameplay: Gameplay) {
  return (dispatch: Dispatch) =>
    callApi('gameplays', 'post', {
      gameplay: {
        s3URL: gameplay.s3URL,
        cloudfrontURL: gameplay.cloudfrontURL,
        createdAt: gameplay.createdAt
      }
    }).then(res => dispatch(addFeedbackRequest(feedback, res.gameplay._id)));
}

function addFeedbackRequest(feedback, gameplayId) {
  return (dispatch) =>
    callApi('feedbacks', 'post', {
      feedback: {
        good: feedback.good,
        better: feedback.better,
        best: feedback.best,
        gameplay: gameplayId,
        game: feedback.gameId,
        sender: feedback.sender,
        overallUX: feedback.overallUX
      }
    }).then(res => dispatch(addFeedback(res.feedback)));
}

export function addFeedbacks(feedbacks: Array<Feedback>) {
  return {
    type: 'ADD_FEEDBACKS',
    feedbacks,
  };
}

function requestFeedbacks() {
  return {
    type: 'REQUEST_FEEDBACKS'
  };
}

function receiveFeedbacks(feedbacks: Array<Feedback>) {
  return {
    type: 'RECEIVE_FEEDBACKS',
    feedbacks
  };
}

function fetchFeedbacks() {
  return dispatch => {
    dispatch(requestFeedbacks());
    return callApi('feedbacks').then(res => {
      dispatch(receiveFeedbacks(res));
      return Promise.resolve(res);
    });
  };
}

function shouldFetchFeedbacks(state) {
  const feedbacks = state.feedback.items;
  if (feedbacks.length === 0) {
    return true;
  } else if (feedbacks.isFetching) {
    return false;
  }

  return false;
}

export function fetchFeedbacksIfNeeded() {
  return (dispatch: Dispatch, getState: Function) => {
    if (shouldFetchFeedbacks(getState())) {
      return dispatch(fetchFeedbacks());
    }
  };
}
