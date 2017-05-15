// @flow
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, RESET_ERROR } from '../actions/auth';

export type authStateType = {
  isFetching: boolean,
  isAuthenticated: boolean
};

// Initial state
const initialState = { isFetching: false, isAuthenticated: localStorage.getItem('id_token') !== null };

export default function auth(state: authStateType = initialState, action: Object) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      });
    case RESET_ERROR:
      return Object.assign({}, state, {
        errorMessage: ''
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      });
    default:
      return state;
  }
}
