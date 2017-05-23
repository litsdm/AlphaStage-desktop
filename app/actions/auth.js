// @flow
import callApi from '../utils/apiCaller';
import type { Dispatch } from './types';
import type { Credentials, NewUser } from '../utils/globalTypes';

function requestLogin(creds) {
  return {
    type: 'LOGIN_REQUEST',
    creds
  };
}

function receiveLogin(token) {
  return {
    type: 'LOGIN_SUCCESS',
    id_token: token
  };
}

function loginError(message) {
  return {
    type: 'LOGIN_FAILURE',
    message
  };
}

export function resetError() {
  return {
    type: 'RESET_ERROR'
  };
}

function requestLogout() {
  return {
    type: 'LOGOUT_REQUEST'
  };
}

function receiveLogout() {
  return {
    type: 'LOGOUT_SUCCESS'
  };
}

export function loginUser(creds: Credentials) {
  return (dispatch: Dispatch) => {
    dispatch(requestLogin(creds));
    return callApi('login', 'post', {
      email: creds.email,
      password: creds.password
    }).then((res) => {
      if (!res.token) {
        dispatch(loginError(res.message));
      } else {
        localStorage.setItem('id_token', res.token);
        dispatch(receiveLogin(res.token));
      }

      return Promise.resolve(res);
    });
  };
}

export function signupUser(creds: NewUser) {
  return (dispatch: Dispatch) =>
  callApi('signup', 'post', {
    user: {
      email: creds.email,
      username: creds.username,
      password: creds.password,
      isDeveloper: creds.isDeveloper
    }
  }).then((res) => {
    if (!res.jwt) {
      dispatch(loginError(res.message));
    } else {
      localStorage.setItem('id_token', res.jwt);
      dispatch(receiveLogin(res.token));
    }

    return Promise.resolve(res);
  });
}

export function logoutUser() {
  return (dispatch: Dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem('id_token');
    dispatch(receiveLogout());
  };
}
