// @flow
import React, { Component } from 'react';

import type { Game } from '../../utils/globalTypes';

import UserGameList from './UserGameList';

export default class DownloadedGames extends Component {
  props: {
    games: Game[]
  }

  render() {
    const { games } = this.props;

    return (
      <div className="container">
        <UserGameList games={games} />
      </div>
    );
  }
}
