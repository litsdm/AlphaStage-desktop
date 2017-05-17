import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

import type { Game } from '../../utils/globalTypes';

export default class GameListItem extends Component {
  props: {
    game: Game,
    selectGame: (gameId: string) => void,
    index: number
  }

  componentDidMount() {
    const { game, selectGame } = this.props;
    $(`#${game._id}`).hover(() => {
      $('.game-component').removeClass('active');

      $(`#${game._id}`).addClass('active');
      selectGame(game._id);
    });
  }

  render() {
    const { game, index } = this.props;
    return (
      <Link to={`/games/${game._id}`}>
        <div id={game._id} className={index === 0 ? 'game-component row active' : 'game-component row'}>
          <div className="list-card">
            <div className="lc-image">
              <img src={game.img} alt={game.name} />
            </div>
            <div className="lc-content">
              <span className="lc-title">{game.name}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}
