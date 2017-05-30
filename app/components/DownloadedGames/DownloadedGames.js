// @flow
import React, { Component } from 'react';

import type { UserGame } from '../../utils/globalTypes';

import UserGameList from './UserGameList';

class DownloadedGames extends Component {
  props: {
    games: UserGame[]
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

export default DownloadedGames;
