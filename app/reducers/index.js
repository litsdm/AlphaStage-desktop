// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import game from './game';
import auth from './auth';
import userGame from './userGame';
import download from './download';

const rootReducer = combineReducers({
  auth,
  download,
  game,
  userGame,
  router,
});

export default rootReducer;
