import callApi from '../utils/apiCaller';
import { uploadGameBuild } from '../utils/uploadApiCaller';

export const REQUEST_SIGNATURE = 'REQUEST_SIGNATURE';
export const RECEIVE_SIGNATURE = 'RECEIVE_SIGNATURE';
export const START_UPLOAD = 'START_UPLOAD';
export const FINISH_UPLOAD = 'FINISHED_UPLOAD';

function requestSignature() {
  return {
    type: REQUEST_SIGNATURE
  }
}

function receiveSignature(url) {
  return {
    type: RECEIVE_SIGNATURE,
    url: url
  }
}

export function requestSignatureCall(file, isWin) {
    return dispatch => {
      dispatch(requestSignature())
      return callApi('/sign-s3?file-name=${file.name}&file-type=${file.type}').then(res => {
        dispatch(receiveSignature(res.url));

        dispatch(uploadFile(file, res.signedRequest));
      });
    }
}

function startUpload() {
  return {
    type: START_UPLOAD
  }
}

function finishUpload() {
  return {
    type: FINISH_UPLOAD
  }
}

function uploadFile(file, signedRequest) {
  return dispatch => {
    dispatch(startUpload());
    return uploadGameBuild(signedRequest, file).then(res => {
      dispatch(finishUpload());
    })
  }
}
