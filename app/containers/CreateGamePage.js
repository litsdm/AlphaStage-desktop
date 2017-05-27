// @flow
import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';

import type { Dispatch } from '../actions/types';

// import actions
import { addGameRequest, fetchEditGameIfNeeded, editGameRequest } from '../actions/game';
import { requestSignatureCall } from '../actions/upload';

// import components
import GameForm from '../components/Game/GameForm';

type Props = {
  isUploading: boolean,
  isFetching: boolean,
  macURL: string,
  winURL: string,
  macName: string,
  winName: string,
  game: Object,
  location: Object,
  dispatch: Dispatch
};

/**
 * CreateGamePage container
 * Displays the game form to add or edit games
 */
class CreateGamePage extends Component {

  handleAddGame: (game: Object) => void;
  handleEditGame: (game: Object, id: string) => void;
  handleRouteChange: (path: string) => void;
  getSignedRequest: (file: Object, isWin: boolean) => void;

  constructor(props: Props) {
    super(props);

    this.handleAddGame = this.handleAddGame.bind(this);
    this.handleEditGame = this.handleEditGame.bind(this);
    this.handleRouteChange = this.handleRouteChange.bind(this);
    this.getSignedRequest = this.getSignedRequest.bind(this);
  }

  componentWillMount() {
    const { dispatch, location } = this.props;

    if (location.query.id) {
      dispatch(fetchEditGameIfNeeded(location.query.id));
    }
  }


  /**
   * Dispatches the addGameRequest action
   * @param {Object} game - New game object
   */
  handleAddGame(game) {
    this.props.dispatch(addGameRequest(game));
  }


  /**
   * Dispatches the editGameRequest action
   * @param {Object} game - Edited game object
   * @param {string} id - Id of the game to edit
   */
  handleEditGame(game, id) {
    this.props.dispatch(editGameRequest(game, id));
  }


  /**
   * Dispatches requestSignatureCall to get signed object for direct s3 upload
   * @param {Object} file - File object to be signed
   * @param {boolean} isWin - Target platform for file
   */
  getSignedRequest(file, isWin) {
    this.props.dispatch(requestSignatureCall(file, isWin));
  }


  /**
   * Is used by child component to change route
   * @param {string} path - Path to go to
   */
  handleRouteChange(path) {
    this.props.dispatch(push(path));
  }

  render() {
    const {
      isUploading, macURL, winURL, macName, winName, location, game, isFetching
    } = this.props;

    const isEditing = location.query.id !== null;

    return (
      <div className="container more-pad">
        <div className="create-header">
          <h1>Create Game</h1>
          <div className="full-divider" />
        </div>
        <div className="game-form">
          {!isEditing &&
            <GameForm
              addGame={this.handleAddGame} winName={winName} macName={macName}
              changeRoute={this.handleRouteChange} getSignedRequest={this.getSignedRequest}
              isUploading={isUploading} macURL={macURL} winURL={winURL}
            />
          }
          {isEditing && !isFetching &&
            <GameForm
              editGame={this.handleEditGame} getSignedRequest={this.getSignedRequest}
              changeRoute={this.handleRouteChange} winURL={winURL} macName={macName}
              isUploading={isUploading} macURL={macURL} isEditing game={game}
              winName={winName}
            />
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
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

export default connect(mapStateToProps)(CreateGamePage);
