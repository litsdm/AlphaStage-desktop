// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import game from './game';

const rootReducer = combineReducers({
  game,
  routing
});

export default rootReducer;
