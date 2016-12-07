// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';

import HomePage from './containers/HomePage';
import GamePage from './containers/GamePage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/games/:id" component={GamePage} />
  </Route>
);
