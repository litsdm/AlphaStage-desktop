import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { addGameRequest } from '../actions/game';
import { uploadBuildRequest } from '../actions/game';

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

  handleUploadBuild(file) {
    this.props.dispatch(uploadBuildRequest(file));
  }

  handleRouteChange(path) {
    this.props.dispatch(push(path));
  }

  render() {
    return (
      <div className="container more-pad">
        <div className="create-header">
          <h1>Create Game</h1>
          <div className="full-divider"></div>
        </div>
        <div className="game-form">
          <GameForm addGame={this.handleAddGame} changeRoute={this.handleRouteChange} />
        </div>
      </div>
    )
  }
}

export default connect()(CreateGamePage)
