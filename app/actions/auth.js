import callApi from '../utils/apiCaller';

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const RESET_ERROR = 'RESET_ERROR'

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(token) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: token
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function resetError() {
  return {
    type: RESET_ERROR,

  }
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

export function loginUser(creds) {
  return (dispatch) => {
    return callApi('login', 'post', {
      email: creds.email,
      password: creds.password
    }).then((res) => {
      if (!res.token) {
        dispatch(loginError(res.message))
      }
      else {
        localStorage.setItem('id_token', res.token)
        dispatch(receiveLogin(res.token))
      }
    })
  }
}

export function signupUser(creds) {
  return (dispatch) => {
    return callApi('signup', 'post', {
      user: {
        email: creds.email,
        username: creds.username,
        password: creds.password,
        isDeveloper: creds.isDeveloper
      }
    }).then((res) => {
      if (!res.jwt) {
        dispatch(loginError(res.message))
      }
      else {
        localStorage.setItem('id_token', res.jwt)
        dispatch(receiveLogin(res.token))
      }
    })
  }
}

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    dispatch(receiveLogout())
  }
}
