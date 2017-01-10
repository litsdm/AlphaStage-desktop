// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';

import HomePage from './containers/HomePage';
import GamePage from './containers/GamePage';
import BrowsePage from './containers/BrowsePage';
import CreateGamePage from './containers/CreateGamePage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/browse" component={BrowsePage} />
    <Route path="/games/new" component={CreateGamePage} />
    <Route path="/games/:id" component={GamePage} />
  </Route>
);
