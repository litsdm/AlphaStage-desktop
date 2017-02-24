// @flow
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';

import DashboardPage from './containers/DashboardPage';
import GamePage from './containers/GamePage';
import BrowsePage from './containers/BrowsePage';
import CreateGamePage from './containers/CreateGamePage';
import YourGamesPage from './containers/YourGamesPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={BrowsePage} />
    <Route path="/dashboard" component={DashboardPage} />
    <Route path="/games/new" component={CreateGamePage} />
    <Route path="/games/library" component={YourGamesPage} />
    <Route path="/games/:id" component={GamePage} />
  </Route>
);
