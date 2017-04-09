// @flow
import { ipcRenderer } from 'electron';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';
import DecompressZip from 'decompress-zip';
import swal from 'sweetalert';
import _ from 'underscore';

// import actions
import { signupUser, loginUser, logoutUser, resetError } from '../actions/auth';
import { finishGameDownload } from '../actions/download';
import { addGameToUserRequest } from '../actions/userGame';
import { redeemItemRequest } from '../actions/redeemItem';
import { allowPlayer } from '../actions/game';

// import components
import Menu from '../components/Menu/Menu';
import Login from '../components/Login';
import RedeemItemModal from '../components/RedeemItemModal';

// Nodejs child process to execute external commands
const exec = require('child_process').exec;


/**
 * Main container every other page gets rendered by this one using
 * {this.props.children}. It handles downloads, updates, login, sign-up,
 * and redeeming items.
 */
class App extends Component {
  constructor(props) {
    super(props);

    this.setupUpdater();

    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.resetError = this.resetError.bind(this);
    this.notifyDownload = this.notifyDownload.bind(this);
    this.redeemKey = this.redeemKey.bind(this);
    this.allowPlayer = this.allowPlayer.bind(this);
  }

  static propTypes = {
    children: PropTypes.element.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  };

  componentDidMount() {
    this.onDownload(); // Set event for game downloads
    this.setupUpdater(); // Set events for auto updater
  }


  /**
   * Sets events to receive auto update messages from the main process.
   */
  setupUpdater() {
    ipcRenderer.on('update-available', this.onUpdateAvailable);
    ipcRenderer.on('update-downloaded', this.onUpdateDownloaded);
  }


  /**
   * Notifies the user when an update is available and gives him the option
   * to download it.
   */
  onUpdateAvailable() {
    swal({
      title: "Update found",
      text: "Do you want to download this update now?",
      showCancelButton: true,
      confirmButtonText: "Yes, download now",
      cancelButtonText: "Maybe later",
    }, () => {
      ipcRenderer.send('download-update');
    });
  }


  /**
   * Notifies the user when an update has been downloaded and gives him the
   * option to quit and install it.
   */
  onUpdateDownloaded() {
    swal({
      title: "Update downloaded!",
      text: "Click on quit and install to update Alpha Stage now.",
      showCancelButton: true,
      confirmButtonText: "Quit and install now!",
      cancelButtonText: "Install later",
    }, () => {
      ipcRenderer.send('quit-and-install');
    });

    new Notification('Update downloaded!', {
      body: "Quit the app to see what's new."
    })
  }


  /**
   * Sets event to receive a download success message from the main process
   * and handles the download depending on the user's OS.
   */
  onDownload() {
    ipcRenderer.on('download-success', (event, args) => {
      const { savePath, filename, id, img, fullname, winExe } = args
      const game = {
        _id: id,
        img,
        name: fullname
      }

      // Set unzipTo path to be on the same directory as the downloaded file
      let unzipTo = savePath.substring(0, savePath.length - filename.length)

      // Check user's platform and unzip accordingly
      if(process.platform === 'darwin') {
        this.unzipMac(id, savePath, filename, unzipTo);
      }
      else {
        this.unzipWindows(id, savePath, filename, unzipTo, winExe);
      }

      // Notify the user that the game download has finished
      this.notifyDownload(game)
    });
  }


  /**
   * Unzip downloaded file for macOS using a child process from Node
   * @param {string} id - Game's id
   * @param {string} savePath - Path to downloaded file
   * @param {string} filename - Name of downloaded file
   * @param {string} unzipTo - Path where downloaded file should be unzipped
   */
  unzipMac(id, savePath, filename, unzipTo) {
    // Unzip files with node child process
    exec(`unzip ${savePath} -d ${unzipTo}`, (error, stdout, stderr) => {
      if (error) { throw error }

      // Delete .zip after unzipping
      exec(`rm -rf ${savePath}`, (error, stdout, stderr) => {
        if (error) { throw error }
      })
    });

    let unzippedPath = savePath.replace(filename, '*.app');

    // Save storage path
    localStorage.setItem(id, unzippedPath);
  }


  /**
   * Unzip downloaded file for Windows using the DecompressZip package
   * @param {string} id - Game's id
   * @param {string} savePath - Path to downloaded file
   * @param {string} filename - Name of downloaded file
   * @param {string} unzipTo - Path where downloaded file should be unzipped
   * @param {string} winExe - Name for the game's .exe file
   */
  unzipWindows(id, savePath, filename, unzipTo, winExe) {
    // unzip file
    let unzipper = new DecompressZip(savePath);

    // Run the unzipper
    unzipper.extract({ path: unzipTo });

    // Delete .zip after unzipping
    unzipper.on('extract', function (log) {
      exec(`DEL ${savePath}`, (error, stdout, stderr) => {
        if (error) { throw error }
      })
    });

    // Replace savepath with exe file to run later
    let unzippedPath
    if (winExe.includes('.exe')) {
      unzippedPath = savePath.replace(filename, winExe);
    }
    else {
      unzippedPath = savePath.replace(filename, winExe + '.exe');
    }

    // Save storage path
    localStorage.setItem(id, unzippedPath);
  }


  /**
   * Notify the user a game has been downloaded and call action to add it to
   * the user's library
   * @param {Object} game - Game object containing _id, img, and fullname
   */
  notifyDownload(game) {
    const { dispatch } = this.props;

    // Get current user from jwt token
    let token = localStorage.getItem('id_token');
    let currentUser = jwtDecode(token);

    dispatch(addGameToUserRequest(currentUser._id, game))
    dispatch(finishGameDownload());

    // Show notification
    new Notification('Download complete!', {
      body: game.name + ' is now available on your Library.'
    })
  }


  /**
   * Calls action to signup user
   * @param {Object} user - Object containing a new user credentials
   */
  signup(user) {
    const { dispatch } = this.props;
    dispatch(signupUser(user));
  }


  /**
   * Calls action to login user
   * @param {Object} user - Credentials to login a user
   */
  login(user) {
    const { dispatch } = this.props;
    dispatch(loginUser(user));
  }


  /**
   * Calls action to logout user
   */
  logout() {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }


  /**
   * Calls action to cleanup login errors
   */
  resetError() {
    const { dispatch } = this.props;
    dispatch(resetError());
  }


  /**
   * Call action to redeem an item
   * @param {string} key - Key for redeemable item (i.e. private game invite key)
   */
  redeemKey(key) {
    const { dispatch } = this.props;

    let token = localStorage.getItem('id_token');
    let currentUser = jwtDecode(token);

    return dispatch(redeemItemRequest(key, currentUser._id))
  }


  /**
   * Allows player to download and play a private game once their key has been
   * verified
   * @param {string} gameId - id of game
   * @param {string} user - id of user to allow
   */
  allowPlayer(gameId, user) {
    const { dispatch, games } = this.props;

    if (!games) { return }

    let index = _.findIndex(games, { _id: gameId });
    dispatch(allowPlayer(index, user));
  }

  render() {
    const { isAuthenticated, errorMessage, location, dispatch } = this.props;

    return (
      <div className="app">
        {!isAuthenticated &&
          <Login signup={this.signup} login={this.login} errorMessage={errorMessage} resetError={this.resetError}/>
        }
        {isAuthenticated &&
          <div id="container">
            <section id="menu">
              <Menu logout={this.logout} path={location.pathname}/>
            </section>
            <div id="content-container">
              {this.props.children}
              <RedeemItemModal redeemKey={this.redeemKey} allowPlayer={this.allowPlayer}/>
            </div>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
    games: state.game.items
  }
}

export default connect(mapStateToProps)(App);
