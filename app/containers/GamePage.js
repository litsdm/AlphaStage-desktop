// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { desktopCapturer, ipcRenderer } from 'electron';
import $ from 'jquery';
import RecordRTC from 'recordrtc';
import jwtDecode from 'jwt-decode';
import swal from 'sweetalert';

// import actions
import { fetchGameIfNeeded } from '../actions/game';
import { getGame } from '../reducers/game';
import { startGameDownload, setInitGameState } from '../actions/download';
import { requestVideoSignature } from '../actions/upload';
import { addRedeemItemRequest } from '../actions/redeemItem';
import { triggerDefaultEvent } from '../actions/analytics';

// import components
import GameShow from '../components/Game/GameShow';
import FeedbackForm from '../components/Feedback/FeedbackForm';
import PrivateInviteModal from '../components/PrivateInviteModal';

// variables  used for recording screen
let recordRTC
let recording = null;

// Nodejs child process to execute external commands
const exec = require('child_process').exec;


/**
 * GamePage container
 * Handles downloading, launching, and recording of games as well as inviting
 * players to a private game and sending the user's feedback.
 */
class GamePage extends Component {
  constructor(props) {
    super(props);

    this.startCapture = this.startCapture.bind(this);
    this.handleOpenGameProcess = this.handleOpenGameProcess.bind(this);
    this.receiveFeedback = this.receiveFeedback.bind(this);
    this.downloadGame = this.downloadGame.bind(this);
    this.invitePlayer = this.invitePlayer.bind(this);
  }

  componentWillMount() {
    const { dispatch, params } = this.props
    dispatch(fetchGameIfNeeded(params.id))
    dispatch(setInitGameState(params.id))
  };


  componentDidMount() {
    const { dispatch, game } = this.props;
    let token = localStorage.getItem('id_token');
    let currentUser = jwtDecode(token);

    dispatch(triggerDefaultEvent("pageView", currentUser._id, game.analytics));
  }


  /**
   * Sends message to main process telling it to start a game download
   * @param {Object} args - Information of game to download
   */
  downloadGame(args) {
    const { dispatch, game } = this.props;

    let token = localStorage.getItem('id_token');
    let currentUser = jwtDecode(token);

    this.setState({ isDownloading: true })
    ipcRenderer.send('download-game', args);
    dispatch(startGameDownload(args.id));
    dispatch(triggerDefaultEvent("download", currentUser._id, game.analytics))
  }


  /**
   * Launches game and starts the recording
   * @param {string} localPath - Path to game executable on user's computer
   */
  handleOpenGameProcess(localPath) {
    const { dispatch, game } = this.props

    // set launch command based on user's platform
    let execCommand;
    if (process.platform == 'darwin') { // if macOS
      execCommand = `open -a ${localPath} --wait-apps`;
    }
    else { // if Windows
      execCommand = `${localPath}`;
    }

    const child = exec(execCommand, (error, stdout, stderr) => {
      if (error) {
        throw error;
      }

      // This is called when the game is closed
      this.stopCapture();
    });

    // Wait 5 seconds for the game to load and start recording
    setTimeout(() => this.startCapture(), 5000);

    // Dispatch analytics action
    let token = localStorage.getItem('id_token');
    let currentUser = jwtDecode(token);
    dispatch(triggerDefaultEvent("play", currentUser._id, game.analytics))
  };


  /**
   * Start recording the user's gameplay
   */
  startCapture() {
    const { game } = this.props;
    // Get sources and select which one we want using props
    let selectedSource = null
    let entireScreen

    // get all recordable screens
    desktopCapturer.getSources({types: ['window', 'screen']}, (error, sources) => {
      const lowerCaseName = game.name.toLowerCase();

      for(let source of sources) {
        // Check for specifi screen only on macOS, on windows it does not record
        // an specific screen correctly.
        if (process.platform === 'darwin') {
          // Try to get screen of game based on the game's name
          let lowerCaseSource = source.name.toLowerCase();
          if (lowerCaseSource.includes(lowerCaseName)) {
            selectedSource = source.id
          }
        }
        if (source.name == "Entire screen") {
          entireScreen = source.id
        }
      }

      // If the specific screen was not found we record the entire screen
      if (!selectedSource) {
        selectedSource = entireScreen
      }

      // Get recording of user's screen
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: selectedSource,
            minWidth: 1280,
            maxWidth: 1280,
            minHeight: 720,
            maxHeight: 720
          }
        }
      }).then((stream) => {
        var options = {
          mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
          bitsPerSecond: 128000,
          canvas: {
            width: 1280,
            height: 720
          }
        };

        // Receive stream and initialize recordRTC
        recordRTC = RecordRTC(stream, options);
        recordRTC.startRecording();

      }).catch((error) => {
        console.log(error);
      });
    });
  }


  /**
   * Stops recording the screen, shows feedback modal, and gets the final recording
   */
  stopCapture() {
    // Display feedback modal
    $("#feedbackForm").modal({
      backdrop: 'static', // Unable to hide by clicking the background
      keyboard: false // Unable to hide with esc key
    });

    if(recordRTC) {
      // Stop the recording
      recordRTC.stopRecording(function (audioVideoWebMURL) {
        // Get the recording
        recording = recordRTC.getBlob();
      });
    }
  }


  /**
   * Receives feedback from the feedback modal, constructs the gameplay object,
   * and dispatches requestVideoSignature to upload video and send feedback.
   * @param {Object} feedback - Object containing the user's feedback
   */
  receiveFeedback(feedback) {
    if (!recording) {
      // Wait for recordRTC to stop the capture and get recording
      setTimeout(() => this.receiveFeedback(feedback), 1000);
      return
    }

    const { dispatch, game } = this.props

    let name = game.name.replace(/\s+/g, '');
    let filename = name + new Date().getTime() + '.webm';

    let gameplay = {
      s3URL: 'https://s3-us-west-1.amazonaws.com/playgrounds-bucket/' + filename,
      cloudfrontURL: 'http://d2g3olpfntndgi.cloudfront.net/' + filename,
      createdAt: Date.now(),
      key: filename
    }

    dispatch(requestVideoSignature(recording, feedback, gameplay))
    $('#feedbackForm').modal('hide');
    swal("Thank you!", "The developer will review your feedback and improve " + game.name, "success")
  }


  /**
   * Shows modal to invite players to private game
   */
  displayInvite() {
    $('#privateInviteModal').modal();
  }


  /**
   * Send invite to selected email and create a redeemItem
   * @param {string} email - Email to send game invite to
   */
  invitePlayer(email) {
    const { dispatch, game } = this.props;

    // Redeem item object, key is created on the server
    const redeemItem = {
      item: game._id,
      type: 'privateGame'
    }

    dispatch(addRedeemItemRequest(redeemItem, email, game.name)).then(() => {
      swal("Invite sent!", email + " received a key to your game and should be playing it soon!", "success")
    })
  }


  /**
   * Delete game from user's library + delete id from localStorage
   * @param {Object} game -  Game to uninstall
   */
  uninstall(game) {
    let name = game.name.replace(/\s+/g, '');
    let gamePath = localStorage.getItem(game._id)
    let deletePath = gamePath.substr(0, gamePath.lastIndexOf("/"));;

    let execCommand;
    // Create delete command depending on platform
    if (process.platform === 'darwin') {
      execCommand = `rm -rf ${deletePath}`
    }
    else {
      execCommand = `rmdir /Q /S ${deletePath}`
    }

    // Run command
    const child = exec(execCommand, (error, stdout, stderr) => {
      if (error) {
        throw error;
      }

      // Directory has been deleted, we remove id from localStorage
      localStorage.removeItem(game._id);

      // Notify the user
      new Notification('Uninstall complete', {
        body: game.name + ' has been removed from your computer.'
      })
    });
  }

  render() {
    const { game, isFetching, isDownloading, isInstalled } = this.props;

    let token = localStorage.getItem('id_token');
    let currentUser = jwtDecode(token);

    return (
      <div>
        {isFetching && !game &&
          <h2>Loading...</h2>
        }
        {!isFetching && !game &&
          <h2>Empty.</h2>
        }
        {game &&
          <div>
            <GameShow
              game={this.props.game} openGame={this.handleOpenGameProcess}
              stopCapture={this.stopCapture} downloadGame={this.downloadGame}
              isDownloading={isDownloading} isInstalled={isInstalled}
              displayInvite={this.displayInvite} uninstall={this.uninstall}
            />
            <FeedbackForm game={game} handleFeedback={this.receiveFeedback} currentUser={currentUser}/>
            <PrivateInviteModal invitePlayer={this.invitePlayer}/>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    game: getGame(state, props.params.id),
    isDownloading: state.download.isDownloading,
    isInstalled: state.download.isInstalled
  };
}

export default connect(mapStateToProps)(GamePage)
