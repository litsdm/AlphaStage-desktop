// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import game from './game';
import feedback from './feedback';
import auth from './auth';

const rootReducer = combineReducers({
  game,
  feedback,
  auth,
  routing
});

export default rootReducer;
