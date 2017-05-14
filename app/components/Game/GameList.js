// @flow
import React, { Component } from 'react';
import $ from 'jquery';

import type { Game } from '../../utils/globalTypes';

import GameListItem from './GameListItem';
import GameListDetail from './GameListDetail';

let detailsOffsetLeft = 0;

type DefaultProps = { games: [Game] };
type Props = { games: [Game] };
type State = { selectedGame: [Game]};

class GameList extends Component<DefaultProps, Props, State> {
  props: {
    games: [Game]
  };
  state: {
    selectedGame: [Game]
  }

  handleHover: (gameId: string) => void;

  // TODO: Create a default game
  static defaultProps = {
    games: [{
      _id: 'id1',
      name: 'Hola'
    }]
  }

  static handleScroll() {
    const offsetTop = $('.game-list').offset().top;
    if (offsetTop <= 0) {
      $('.game-details')
      .css('position', 'fixed')
      .css('top', 0)
      .css('right', '5px')
      .css('left', detailsOffsetLeft);
    } else {
      $('.game-details').css('position', 'static');
    }
  }

  constructor(props: Props) {
    super(props);

    this.state = {
      selectedGame: props.games[0]
    };
    this.handleHover = this.handleHover.bind(this);
  }

  componentDidMount() {
    const scrollContent: ?HTMLElement = document.getElementById('content-container');
    if (scrollContent !== null && scrollContent !== undefined) {
      scrollContent.addEventListener('scroll', GameList.handleScroll);
    }
    detailsOffsetLeft = $('.game-details').offset().left;
  }

  componentWillUnmount() {
    const scrollContent: ?HTMLElement = document.getElementById('content-container');
    if (scrollContent !== null && scrollContent !== undefined) {
      scrollContent.addEventListener('scroll', GameList.handleScroll);
    }
  }

  handleHover(gameId: string) {
    const { games } = this.props;
    const game = games.filter(item => item._id === gameId)[0];
    this.setState({
      selectedGame: game
    });
  }

  render() {
    const games = this.props.games.map((game, i) =>
      <GameListItem game={game} key={game._id} index={i} selectGame={this.handleHover} />
    );

    return (
      <div className="game-list" id="myDiv">
        <div className="row">
          <div className="col-lg-8">
            {games}
          </div>
          <div className="col-lg-4 game-details">
            <GameListDetail game={this.state.selectedGame} />
          </div>
        </div>
      </div>
    );
  }
}

export default GameList;
