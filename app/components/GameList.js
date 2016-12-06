import React, { Component } from 'react';

import GameComponent from './GameComponent';

export default class GameList extends Component {
  render() {
    return (
      <div className="game-list">
        <div className="row">
          {this.props.games.map((game, i) =>
            <div className="col-md-6 col-lg-4">
              <GameComponent game={game} />
            </div>
          )}
        </div>
      </div>
    )
  }
}
