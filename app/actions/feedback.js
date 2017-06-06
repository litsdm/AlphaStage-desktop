// @flow
import callApi from '../utils/apiCaller';
import type { Dispatch } from './types';
import type { Feedback, Gameplay } from '../utils/globalTypes';

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

export function addFeedbackRequest(feedback: Feedback, gameplayId: string) {
  return () =>
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
    });
}
