import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getGame } from '../reducers/game';
import GameComponent from '../components/GameComponent';

class GamePage extends Component {
  render() {
    return (
      <div>
        <h1>Game</h1>
        <GameComponent game={this.props.game} />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    game: getGame(state, props.params.id)
  };
}

export default connect(mapStateToProps)(GamePage)
