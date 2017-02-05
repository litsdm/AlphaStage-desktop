// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import game from './game';
import gameplay from './gameplay';
import feedback from './feedback';

const rootReducer = combineReducers({
  game,
  gameplay,
  feedback,
  routing
});

export default rootReducer;
