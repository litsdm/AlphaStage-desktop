import callApi from '../utils/apiCaller';

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

export function loginUser(creds) {
  return (dispatch) => {
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

export function signupUser(creds) {
  return (dispatch) =>
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
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem('id_token');
    dispatch(receiveLogout());
  };
}
