import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { desktopCapturer, ipcRenderer } from 'electron';
import $ from 'jquery';
import RecordRTC from 'recordrtc';
import jwtDecode from 'jwt-decode';
import swal from 'sweetalert';

import GameShow from '../components/Game/GameShow';
import FeedbackForm from '../components/Feedback/FeedbackForm';

import { fetchGameIfNeeded } from '../actions/game';
import { getGame } from '../reducers/game';
import { uploadFileRequest } from '../actions/feedback';

let recordRTC
let recording = null;

const spawn = require('child_process').spawn;
const execFile = require('child_process').exec;

class GamePage extends Component {
  constructor(props) {
    super(props);

    this.startCapture = this.startCapture.bind(this);
    this.handleOpenGameProcess = this.handleOpenGameProcess.bind(this);
    this.receiveFeedback = this.receiveFeedback.bind(this);
  }

  componentWillMount() {
    const { dispatch, params } = this.props
    dispatch(fetchGameIfNeeded(params.id))
  };

  downloadGame(args) {
    ipcRenderer.send('download-game', args);

    ipcRenderer.on('download-success', (event, arg) => {
      swal("Download complete!", "You can now play this game from your Library.", "success")
    });

    ipcRenderer.on('download-failed', (event, arg) => {
      swal("Download failed!", "Please try again or contact support at alphastagegames@gmail.com.", "error");
    });
  }

  handleOpenGameProcess(localPath) {
    /* Possible windows process
    const child = execFile(localPath, (error, stdout, stderr) => {
      if (error) {
        throw error;
      }
      console.log(stdout);
    });*/

    // Open a game in macOS maybe Linux aswell

    const { game } = this.props

    const gameProcess = spawn('open', ['-a', localPath, '--wait-apps']);

    gameProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      this.stopCapture();
    });

    setTimeout(() => this.startCapture(), 5000);
  };

  startCapture() {
    const { game } = this.props;
    // Get sources and select which one we want using props
    console.log("Record function called for " + game.name);

    let selectedSource = null
    let entireScreen

    desktopCapturer.getSources({types: ['window', 'screen']}, (error, sources) => {
      const lowerCaseName = game.name.toLowerCase();

      for(let source of sources) {
        let lowerCaseSource = source.name.toLowerCase();
        if (lowerCaseSource.includes(lowerCaseName)) {
          selectedSource = source.id
        }
        if (source.name == "Entire screen") {
          entireScreen = source.id
        }
      }

      if (!selectedSource) {
        selectedSource = entireScreen
      }

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
          audioBitsPerSecond: 128000,
          videoBitsPerSecond: 128000,
          bitsPerSecond: 128000, // if this line is provided, skip above two
          canvas: {
            width: 1280,
            height: 720
          }
        };
        recordRTC = RecordRTC(stream, options);
        recordRTC.startRecording();

      }).catch((error) => {
        console.log(error);
      });
    });
  }

  stopCapture() {
    $("#feedbackForm").modal({
      backdrop: 'static',
      keyboard: false
    });

    if(recordRTC) {
      recordRTC.stopRecording(function (audioVideoWebMURL) {
        recording = recordRTC.getBlob();
      });
    }
  }

  receiveFeedback(feedback) {
    if (!recording) {
      setTimeout(() => this.receiveFeedback(feedback), 1000);
      return
    }

    const { dispatch, game } = this.props

    let name = game.name.replace(/\s+/g, '');
    let filename = name + new Date().getTime() + '.webm';

    let formData = new FormData();
    formData.append('upl', recording, filename);

    let gameplay = {
      s3URL: 'https://s3-us-west-1.amazonaws.com/playgrounds-bucket/' + filename,
      cloudfrontURL: 'http://d2g3olpfntndgi.cloudfront.net/' + filename,
      createdAt: Date.now(),
      key: filename
    }

    dispatch(uploadFileRequest(formData, feedback, gameplay));
    $('#feedbackForm').modal('hide');
    swal("Thank you!", "The developer will review your feedback and improve " + game.name, "success")
  }

  render() {
    const { game, isFetching } = this.props;

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
            <GameShow game={this.props.game} openGame={this.handleOpenGameProcess} stopCapture={this.stopCapture} downloadGame={this.downloadGame}/>
            <FeedbackForm game={game} handleFeedback={this.receiveFeedback} currentUser={currentUser}/>
          </div>
        }
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
