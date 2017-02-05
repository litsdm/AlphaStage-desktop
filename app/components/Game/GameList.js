import React, { Component } from 'react';
import $ from 'jquery';

import GameListItem from './GameListItem';
import GameListDetail from './GameListDetail';

let detailsOffsetLeft = 0

export default class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedGame: {}};
    this.handleHover = this.handleHover.bind(this);
  };

  componentDidMount() {
    this.setState({selectedGame: this.props.games[0]})

    document.getElementById('content-container').addEventListener('scroll', this.handleScroll);
    detailsOffsetLeft = $('.game-details').offset().left
  };

  handleScroll(e) {
    let offsetTop = $('.game-list').offset().top
    if (offsetTop <= 0) {
      $('.game-details').css('position', 'fixed').css('top', 0).css('right', '5px').css('left', detailsOffsetLeft);
    }
    else {
      $('.game-details').css('position', 'static');
    }
  };

  handleHover(gameId) {
    let game = this.props.games.filter(game => game._id === gameId)[0];
    this.setState({selectedGame: game})
  };

  render() {
    const games = this.props.games.map((game, i) =>
      <GameListItem game={game}  key={game._id} index={i} selectGame={this.handleHover}/>
    );

    return (
      <div className="game-list">
        <div className="row">
          <div className="col-lg-8">
            {games}
          </div>
          <div className="col-lg-4 game-details">
            <GameListDetail game={this.state.selectedGame}/>
          </div>
        </div>
      </div>
    )
  }

  componentWillUnmount() {
    document.getElementById('content-container').removeEventListener('scroll', this.handleScroll);
  }
}
