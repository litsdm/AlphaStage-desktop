// @flow
import React, { Component } from 'react';

import type { UserGame } from '../../utils/globalTypes';

import UserGameListItem from './UserGameListItem';

export default class UserGameList extends Component {
  props: {
    games: UserGame[]
  }
  render() {
    const { games } = this.props;

    const items = games.map((game) =>
      <UserGameListItem game={game} key={game._id} />
    );

    return (
      <div className="user-game-list row">
        {items}
      </div>
    );
  }
}
