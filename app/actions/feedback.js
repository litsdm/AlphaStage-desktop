import callApi from '../utils/apiCaller';

export const ADD_FEEDBACK = 'ADD_FEEDBACK';
export const ADD_FEEDBACKS = 'ADD_FEEDBACKS';
export const REQUEST_FEEDBACKS = 'REQUEST_FEEDBACKS';
export const RECEIVE_FEEDBACKS = 'RECEIVE_FEEDBACKS';
export const DELETE_FEEDBACK = 'DELETE_FEEDBACK';

export function addFeedback(feedback) {
  return {
    type: ADD_FEEDBACK,
    feedback,
  };
}

export function addFeedbackRequest(feedback) {
  return (dispatch) => {
    return callApi('feedbacks', 'post', {
      feedback: {
        good: feedback.good,
        better: feedback.better,
        best: feedback.best,
        gameplay: feedback.gameplay
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
