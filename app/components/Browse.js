// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';

import GameList from './GameList';

export default class Home extends Component {
  render() {
    return (
      <div className="browse">
        <h1>Browse</h1>
        <GameList games={this.props.games} />
      </div>
    );
  }
}
