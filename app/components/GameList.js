import React, { Component } from 'react';

import GameListItem from './GameListItem';

export default class GameList extends Component {
  render() {
    return (
      <div className="game-list">
        <div className="row">
          <div className="col-lg-8">
            {this.props.games.map((game, i) =>
              <GameListItem game={game}  key={game._id}/>
            )}
          </div>
          <div className="col-lg-4 game-details">

          </div>
        </div>
      </div>
    )
  }
}
