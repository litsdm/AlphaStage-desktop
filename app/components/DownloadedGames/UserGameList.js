import React, { Component } from 'react';

import UserGameListItem from './UserGameListItem';

export default class UserGameList extends Component {
  render() {
    const { games } = this.props;

    let items = games.map((game) =>
      <UserGameListItem game={game} key={game._id}/>
    );

    return (
      <div className="user-game-list row">
        {items}
      </div>
    )
  }
}
