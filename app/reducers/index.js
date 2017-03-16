// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import game from './game';
import feedback from './feedback';
import auth from './auth';
import devGame from './devGame';
import userGame from './userGame';
import download from './download';
import upload from './upload';

const appReducer = combineReducers({
  game,
  feedback,
  auth,
  devGame,
  userGame,
  download,
  upload,
  routing
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_SUCCESS') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;
