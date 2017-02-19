import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { desktopCapturer } from 'electron';
import $ from 'jquery';
import RecordRTC from 'recordrtc';
import jwtDecode from 'jwt-decode';

import GameShow from '../components/Game/GameShow';

import { fetchGameIfNeeded } from '../actions/game';
import { getGame } from '../reducers/game';
import { uploadFileRequest } from '../actions/feedback';

let recordRTC

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

  handleOpenGameProcess(playable) {
    /* Possible windows process
    const child = execFile(localPath, (error, stdout, stderr) => {
      if (error) {
        throw error;
      }
      console.log(stdout);
    });*/

    // Open a game in macOS maybe Linux aswell

    const { game } = this.props

    let localPath;
    playable.forEach((playableGame) => {
      if (game.name.toLowerCase() == playableGame.name) {
        localPath = playableGame.path;
      }
    });

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
    const { dispatch, game } = this.props

    let token = localStorage.getItem('id_token');
    let currentUser = jwtDecode(token);

    if(recordRTC) {
      recordRTC.stopRecording(function (audioVideoWebMURL) {
        var recordedBlob = recordRTC.getBlob();

        let name = game.name.replace(/\s+/g, '');
        let filename = name + new Date().getTime() + '.webm';

        let formData = new FormData();
        formData.append('upl', recordedBlob, filename);

        let gameplay = {
          s3URL: 'https://s3-us-west-1.amazonaws.com/playgrounds-bucket/' + filename,
          cloudfrontURL: 'http://d2g3olpfntndgi.cloudfront.net/' + filename,
          createdAt: Date.now(),
          key: filename
        }

        let feedback = {
          good: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer bibendum massa vel placerat tincidunt. Aliquam euismod sed magna ac rutrum. Ut convallis purus sit amet turpis imperdiet, a laoreet nibh mollis. Etiam sollicitudin, purus id scelerisque maximus, augue lorem facilisis enim, nec cursus sapien nulla ac sem. Ut sed dui non orci auctor ultrices. Vestibulum et tortor risus. Nullam dui neque, finibus ac venenatis ut, molestie eget urna. Cras ultrices ipsum non mollis suscipit.",
          better: "Nulla lacinia mi a augue rhoncus congue non quis tellus. Cras a justo arcu. Quisque erat risus, ornare ac sem in, malesuada tristique orci. Ut euismod erat vitae orci commodo condimentum. Sed faucibus justo ut blandit rutrum. Fusce felis leo, interdum ut risus ac, luctus tempus lorem. Phasellus vitae magna eget urna imperdiet consequat. Aliquam vel odio at felis hendrerit lobortis. Integer egestas ullamcorper turpis, sit amet maximus libero consequat vitae.",
          best: "Sed sodales tortor eu purus scelerisque scelerisque. Sed vehicula felis metus, a efficitur nunc dictum nec. Donec egestas leo lorem, sit amet convallis eros viverra ut. Integer nec molestie mauris, at placerat lectus. Nunc lacus enim, sagittis vitae ullamcorper porttitor, interdum efficitur eros. Nam eu cursus erat. Aenean imperdiet augue et facilisis varius. Cras orci nulla, pretium nec massa sodales, interdum congue nisi.",
          gameId: game._id,
          sender: currentUser._id
        }

        dispatch(uploadFileRequest(formData, feedback, gameplay));
      });
    }
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
