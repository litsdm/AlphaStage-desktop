// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import auth from './auth';
import download from './download';
import game from './game';
import userGame from './userGame';

import type { Action } from '../actions/types';

const appReducer = combineReducers({
  auth,
  download,
  game,
  userGame,
  router,
});

const rootReducer = (state?: Object, action: Action) => {
  if (action.type === 'LOGOUT_SUCCESS') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
