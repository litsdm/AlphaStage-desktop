import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { addGameRequest } from '../actions/game';
import { requestSignatureCall } from '../actions/upload';

import GameForm from '../components/Game/GameForm';

class CreateGamePage extends Component {
  constructor(props) {
    super(props);

    this.handleAddGame = this.handleAddGame.bind(this);
    this.handleRouteChange = this.handleRouteChange.bind(this);
    this.getSignedRequest = this.getSignedRequest.bind(this);
  }

  handleAddGame(game) {
    this.props.dispatch(addGameRequest(game));
  }

  getSignedRequest(file, isWin) {
    this.props.dispatch(requestSignatureCall(file, isWin));
  }

  handleRouteChange(path) {
    this.props.dispatch(push(path));
  }

  render() {
    const { isUploading, macURL, winURL } = this.props;
    
    return (
      <div className="container more-pad">
        <div className="create-header">
          <h1>Create Game</h1>
          <div className="full-divider"></div>
        </div>
        <div className="game-form">
          <GameForm addGame={this.handleAddGame} uploadBuild={this.handleUploadBuild}
            changeRoute={this.handleRouteChange} getSignedRequest={this.getSignedRequest}
            isUploading={isUploading} macURL={macURL} winURL={winURL}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    isUploading: state.upload.isUploading,
    macURL: state.upload.macURL,
    winURL: state.upload.winURL
  };
}

export default connect(mapStateToProps)(CreateGamePage)
