import callApi from '../utils/apiCaller';
import { callUploadApi } from '../utils/uploadApiCaller';

export const ADD_FEEDBACK = 'ADD_FEEDBACK';
export const ADD_FEEDBACKS = 'ADD_FEEDBACKS';
export const REQUEST_FEEDBACKS = 'REQUEST_FEEDBACKS';
export const RECEIVE_FEEDBACKS = 'RECEIVE_FEEDBACKS';
export const DELETE_FEEDBACK = 'DELETE_FEEDBACK';
export const MARK_FEEDBACK = 'MARK_FEEDBACK';

export function uploadFileRequest(formData, feedback, gameplay) {
  return (dispatch) => {
    return callUploadApi('upload', 'post', formData).then(res => dispatch(addGameplayRequest(feedback, gameplay)));
  }
}

export function markFeedbackRequest(feedbackId, mark, childIndex, parentIndex) {
  return (dispatch) => {
    return callApi('feedbacks/mark', 'post', {
      feedbackId,
      mark
    }).then(res => dispatch(markFeedback(childIndex, parentIndex, mark)))
  }
}

function markFeedback(childIndex, parentIndex, mark) {
  return {
    type: MARK_FEEDBACK,
    childIndex,
    parentIndex,
    mark
  }
}

export function addFeedback(feedback) {
  return {
    type: ADD_FEEDBACK,
    feedback,
  };
}

export function addGameplayRequest(feedback, gameplay) {
  return (dispatch) => {
    return callApi('gameplays', 'post', {
      gameplay: {
        s3URL: gameplay.s3URL,
        cloudfrontURL: gameplay.cloudfrontURL,
        createdAt: gameplay.createdAt
      }
    }).then(res => dispatch(addFeedbackRequest(feedback, res.gameplay._id)));
  };
}

function addFeedbackRequest(feedback, gameplayId) {
  return (dispatch) => {
    return callApi('feedbacks', 'post', {
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
  };
}

export function addFeedbacks(feedbacks) {
  return {
    type: ADD_FEEDBACKS,
    feedbacks,
  };
}

function requestFeedbacks() {
  return {
    type: REQUEST_FEEDBACKS
  }
}

function receiveFeedbacks(feedbacks) {
  return {
    type: RECEIVE_FEEDBACKS,
    feedbacks: feedbacks
  }
}

function fetchFeedbacks() {
  return dispatch => {
    dispatch(requestFeedbacks())
    return callApi('feedbacks').then(res => {
      dispatch(receiveFeedbacks(res));
    });
  }
}

function shouldFetchFeedbacks(state) {
  const feedbacks = state.feedback.items
  if (feedbacks.length == 0) {
    return true
  } else if (feedbacks.isFetching) {
    return false
  } else {
    return false
  }
}

export function fetchFeedbacksIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchFeedbacks(getState())) {
      return dispatch(fetchFeedbacks())
    }
  }
}
