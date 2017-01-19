// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import game from './game';
import gameplay from './gameplay';

const rootReducer = combineReducers({
  game,
  gameplay,
  routing
});

export default rootReducer;
