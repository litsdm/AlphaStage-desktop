// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import type { Game } from '../../utils/globalTypes';

export default class UserGameListItem extends Component {
  props: {
    game: Game
  }

  render() {
    const { game } = this.props;

    const gameRoute = `/games/${game._id}`;

    return (
      <Link to={gameRoute} className="ug-item col-md-4">
        <img className="ugl-img" src={game.img} alt={`${game.name} in downloaded game list`} />
        <p className="ugl-name">{game.name}</p>
      </Link>
    );
  }
}
