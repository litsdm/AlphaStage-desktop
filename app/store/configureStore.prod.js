// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers/index';

import type { authStateType } from '../reducers/auth';
import type { devGameStateType } from '../reducers/devGame';
import type { downloadStateType } from '../reducers/download';
import type { gameStateType } from '../reducers/game';
import type { uploadStateType } from '../reducers/upload';
import type { userGameStateType } from '../reducers/userGame';

const history = createBrowserHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

type State = {
  auth: authStateType,
  devGame: devGameStateType,
  download: downloadStateType,
  game: gameStateType,
  upload: uploadStateType,
  userGame: userGameStateType
};

function configureStore(initialState?: State) {
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
