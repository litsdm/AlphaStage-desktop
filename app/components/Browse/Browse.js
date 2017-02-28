// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';

import GameList from '../Game/GameList';

export default class Home extends Component {
  render() {
    return (
      <div className="browse">
        <GameList games={this.props.games} />
      </div>
    );
  }
}
