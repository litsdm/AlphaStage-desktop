import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

import * as gameActions from '../actions/game';
import * as devGameActions from '../actions/devGame';
import * as downloadActions from '../actions/download';
import * as feedbackActions from '../actions/feedback';
import * as redeemItemActions from '../actions/redeemItem';
import * as uploadActions from '../actions/upload';
import * as userGameActions from '../actions/userGame';

const actionCreators = {
  ...gameActions,
  ...devGameActions,
  ...downloadActions,
  ...feedbackActions,
  ...redeemItemActions,
  ...uploadActions,
  ...userGameActions,
  push,
};

const logger = createLogger({
  level: 'info',
  collapsed: true
});

const router = routerMiddleware(hashHistory);

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
    actionCreators,
  }) :
  compose;
/* eslint-enable no-underscore-dangle */
const enhancer = composeEnhancers(
  applyMiddleware(thunk, router, logger)
);

export default function configureStore(initialState: Object) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  return store;
}
