// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';

import GameList from './GameList';
import BrowseHeader from './BrowseHeader'

export default class Home extends Component {
  render() {
    return (
      <div className="browse">
        <BrowseHeader />
        <GameList games={this.props.games} />
      </div>
    );
  }
}
