// @flow
import React, { Component } from 'react';
import type { Game } from '../../utils/globalTypes';

import GameList from '../Game/GameList';

class Browse extends Component {
  props: {
    games: Array<Game>
  };

  render() {
    return (
      <div className="browse">
        <GameList games={this.props.games} />
      </div>
    );
  }
}

export default Browse;
