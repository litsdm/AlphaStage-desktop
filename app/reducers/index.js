// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import game from './game';
import auth from './auth';
import devGame from './devGame';
import userGame from './userGame';
import download from './download';
import upload from './upload';

import type { Action } from '../actions/types';

const appReducer = combineReducers({
  game,
  auth,
  devGame,
  userGame,
  download,
  upload,
  router,
});

const rootReducer = (state?: Object, action: Action) => {
  if (action.type === 'LOGOUT_SUCCESS') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
