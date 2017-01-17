import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { desktopCapturer } from 'electron';
import MediaStreamRecorder, { MediaRecorderWrapper } from 'msr';
import $ from 'jquery';

import GameShow from '../components/GameShow';

import { fetchGameIfNeeded, uploadFileRequest } from '../actions/game';
import { getGame } from '../reducers/game';


let mediaRecorder;
let blobs = [];
let binaries = [];

const spawn = require('child_process').spawn;
const execFile = require('child_process').exec;

class GamePage extends Component {
  constructor(props) {
    super(props);

    this.startCapture = this.startCapture.bind(this);
    this.handleOpenGameProcess = this.handleOpenGameProcess.bind(this);
  }

  componentWillMount() {
    const { dispatch, params } = this.props
    dispatch(fetchGameIfNeeded(params.id))
  };

  handleOpenGameProcess(localPath) {
    /* Possible windows process
    const child = execFile(localPath, (error, stdout, stderr) => {
      if (error) {
        throw error;
      }
      console.log(stdout);
    });*/

    // Open a game in macOS maybe Linux aswell
    const gameProcess = spawn('open', ['-a', localPath, '--wait-apps']);

    gameProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    gameProcess.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

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
        mediaRecorder = new MediaStreamRecorder(stream);
        mediaRecorder.mimeType = 'video/webm';
        mediaRecorder.recorderType = MediaRecorderWrapper;

        mediaRecorder.ondataavailable = (blob) => {
          let blobURL = URL.createObjectURL(blob)
          blobs.push(blob);
          console.log(blob);
          console.log(blobURL);
          //mediaRecorder.save(blob, new Date().getTime() + "-custom.webm");
          //$('#video').attr("src", blobURL);
        }

        mediaRecorder.start(5 * 5000);

      }).catch((error) => {
        console.log(error);
      });
    });
  }

  stopCapture() {
    if(mediaRecorder) {
      mediaRecorder.stop();

      this.manageCapturedBlobs();
    }
  }

  manageCapturedBlobs() {
    let reader = new FileReader();

    reader.addEventListener("load", () => {
      binaries.push(reader.result);
    });

    blobs.forEach((blob) => {
      reader.readAsBinaryString(blob);
    });

    this.sendBlobs();
  }

  sendBlobs() {
    if (binaries.length < blobs.length) {
      setTimeout(() => this.sendBlobs(), 10);
    }

    const { dispatch, game } = this.props

    let boundary = "blob";
    let data = "";

    let elementName = "recorder";
    let filename = game.name + new Date.getTime();
    let contentType = 'video/webm'

    data += "--" + boundary + "\r\n";

    data += 'content-disposition: form-data; '
          + 'name="'         + elementName          + '"; '
          + 'filename="'     + filename + '"\r\n';

    data += 'Content-Type: ' + contentType + '\r\n';
    data += '\r\n';

    binaries.forEach((binary) => {
      data += binary;
    });

    data += '\r\n';
    data += "--" + boundary + "--";

    dispatch(uploadFileRequest(data));
  }

  render() {
    const { game, isFetching } = this.props;
    return (
      <div>
        {isFetching && !game &&
          <h2>Loading...</h2>
        }
        {!isFetching && !game &&
          <h2>Empty.</h2>
        }
        {game &&
          <GameShow game={this.props.game} openGame={this.handleOpenGameProcess} stopCapture={this.stopCapture}/>
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
