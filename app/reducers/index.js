// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import game from './game';
import feedback from './feedback';

const rootReducer = combineReducers({
  game,
  feedback,
  routing
});

export default rootReducer;
