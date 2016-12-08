// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';

import GameList from './GameList';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className="browse">
          <GameList games={this.props.games} />
        </div>
      </div>
    );
  }
}
