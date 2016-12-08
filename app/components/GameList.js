import React, { Component } from 'react';

import GameListItem from './GameListItem';
import GameListDetail from './GameListDetail';

export default class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedGame: {}};
    this.handleSelectGame = this.handleSelectGame.bind(this);
  };

  componentDidMount() {
    this.setState({selectedGame: this.props.games[0]})
  };

  handleSelectGame(gameId) {
    let game = this.props.games.filter(game => game._id === gameId)[0];
    this.setState({selectedGame: game})
  };

  render() {

    return (
      <div className="game-list">
        <div className="row">
          <div className="col-lg-8">
            {this.props.games.map((game, i) =>
              <GameListItem game={game}  key={game._id} className={i == 0 ? "active" : ""} selectGame={this.handleSelectGame}/>
            )}
          </div>
          <div className="col-lg-4 game-details">
            <GameListDetail game={this.state.selectedGame}/>
          </div>
        </div>
      </div>
    )
  }
}
