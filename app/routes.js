/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';

import App from './containers/App';
import BrowsePage from './containers/BrowsePage';
import GamePage from './containers/GamePage';
import DashboardPage from './containers/DashboardPage';

export default () => (
  <App>
    <Switch>
      <Route exact path="/" component={BrowsePage} />
      <Route path="/games/:id" component={GamePage} />
      <Route path="/dashboard" component={DashboardPage} />
    </Switch>
  </App>
);
