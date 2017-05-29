/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';

import App from './containers/App';
import BrowsePage from './containers/BrowsePage';
import CreateGamePage from './containers/CreateGamePage';
import DashboardPage from './containers/DashboardPage';
import GamePage from './containers/GamePage';
import LibraryPage from './containers/LibraryPage';

export default () => (
  <App>
    <Switch>
      <Route exact path="/" component={BrowsePage} />
      <Route path="/games/new" component={CreateGamePage} />
      <Route path="/games/:id" component={GamePage} />
      <Route path="/dashboard" component={DashboardPage} />
      <Route path="/games/library" component={LibraryPage} />
    </Switch>
  </App>
);
