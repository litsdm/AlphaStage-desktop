import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { addGameRequest } from '../actions/game';

import GameForm from '../components/GameForm';

class CreateGamePage extends Component {
  constructor(props) {
    super(props);

    this.handleAddGame = this.handleAddGame.bind(this);
  }

  handleAddGame(name, description, imgURL) {
    this.props.dispatch(addGameRequest({ name, description, imgURL }));
  }

  render() {
    return (
      <div className="container">
        <h1>New Game</h1>
        <GameForm addGame={this.handleAddGame} />
      </div>
    )
  }
}

export default connect()(CreateGamePage)
