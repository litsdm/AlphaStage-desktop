import React, { Component, PropTypes } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import { addGameRequest, fetchEditGameIfNeeded } from '../actions/game';
import { requestSignatureCall } from '../actions/upload';

import GameForm from '../components/Game/GameForm';

class CreateGamePage extends Component {
  constructor(props) {
    super(props);

    this.handleAddGame = this.handleAddGame.bind(this);
    this.handleRouteChange = this.handleRouteChange.bind(this);
    this.getSignedRequest = this.getSignedRequest.bind(this);
  }

  componentWillMount() {
    const { dispatch, location } = this.props;

    if (location.query.id) {
      dispatch(fetchEditGameIfNeeded(location.query.id));
    }

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
    const { isUploading, macURL, winURL, macName, winName, location, game, isFetching } = this.props;

    let isEditing = location.query.id ? true : false;

    return (
      <div className="container more-pad">
        <div className="create-header">
          <h1>Create Game</h1>
          <div className="full-divider"></div>
        </div>
        <div className="game-form">
          {!isEditing &&
            <GameForm
              addGame={this.handleAddGame} uploadBuild={this.handleUploadBuild}
              changeRoute={this.handleRouteChange} getSignedRequest={this.getSignedRequest}
              isUploading={isUploading} macURL={macURL} winURL={winURL} macName={macName} winName={winName}
            />
          }
          {isEditing && !isFetching &&
            <GameForm
              editGame={this.handleEditGame} uploadBuild={this.handleUploadBuild}
              changeRoute={this.handleRouteChange} getSignedRequest={this.getSignedRequest}
              isUploading={isUploading} macURL={macURL} winURL={winURL} macName={macName} winName={winName}
              isEditing game={game}
            />
          }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    isUploading: state.upload.isUploading,
    macURL: state.upload.macURL,
    winURL: state.upload.winURL,
    macName: state.upload.macName,
    winName: state.upload.winName,
    game: state.game.editGame,
    isFetching: state.game.isFetching
  };
}

export default connect(mapStateToProps)(CreateGamePage)
