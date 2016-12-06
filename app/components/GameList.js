import React, { Component } from 'react';

import GameComponent from './GameComponent';

export default class GameList extends Component {
  render() {
    return (
      <div className="game-list">
        <div className="row">
          {this.props.games.map((game, i) =>
            <GameComponent game={game}  key={game._id}/>
          )}
        </div>
      </div>
    )
  }
}
