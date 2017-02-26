import callApi from '../utils/apiCaller';
import { uploadGameBuild } from '../utils/uploadApiCaller';

export const REQUEST_SIGNATURE = 'REQUEST_SIGNATURE';
export const RECEIVE_MAC_SIGNATURE = 'RECEIVE_MAC_SIGNATURE';
export const RECEIVE_WIN_SIGNATURE = 'RECEIVE_WIN_SIGNATURE';
export const START_UPLOAD = 'START_UPLOAD';
export const FINISH_UPLOAD = 'FINISH_UPLOAD';

function requestSignature() {
  return {
    type: REQUEST_SIGNATURE
  }
}

function receiveSignature(url, isWin) {
  let type = isWin ? RECEIVE_WIN_SIGNATURE : RECEIVE_MAC_SIGNATURE
  return {
    type,
    url
  }
}

export function requestSignatureCall(file, isWin) {
  const prefix = (isWin ? 'win' : 'mac') + new Date().getTime();
  const filename = prefix + file.name;

  return dispatch => {
    dispatch(requestSignature())
    return callApi(`sign-s3?file-name=${filename}&file-type=${file.type}`).then(res => {
      dispatch(receiveSignature(res.url, isWin));
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
    return uploadGameBuild('PUT', signedRequest, file, (err, res) => {
      dispatch(finishUpload());
    })
  }
}
