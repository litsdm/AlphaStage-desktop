import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { addGameRequest } from '../actions/game';

import GameForm from '../components/GameForm';

class CreateGamePage extends Component {
  constructor(props) {
    super(props);

    this.handleAddGame = this.handleAddGame.bind(this);
    this.handleRouteChange = this.handleRouteChange.bind(this);
  }

  handleAddGame(game) {
    this.props.dispatch(addGameRequest(game));
  }

  handleRouteChange(path) {
    this.props.dispatch(push(path));
  }

  render() {
    return (
      <div className="container">
        <h1>New Game</h1>
        <GameForm addGame={this.handleAddGame} changeRoute={this.handleRouteChange} />
      </div>
    )
  }
}

export default connect()(CreateGamePage)