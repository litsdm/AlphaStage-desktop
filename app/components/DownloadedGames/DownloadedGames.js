import React, { Component } from 'react';

import UserGameList from './UserGameList';

export default class DownloadedGames extends Component {
  render() {
    const { games } = this.props;

    return <UserGameList games={games}/>
  }
}
