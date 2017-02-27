import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import jwtDecode from 'jwt-decode';
import DecompressZip from 'decompress-zip';

const exec = require('child_process').exec;

import { signupUser, loginUser, logoutUser } from '../actions/auth';
import { finishGameDownload } from '../actions/download';
import { addGameToUserRequest } from '../actions/userGame';

import Menu from '../components/Menu/Menu';
import Login from '../components/Login';

class App extends Component {
  constructor(props) {
    super(props);

    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.notifyDownload = this.notifyDownload.bind(this);
  }

  static propTypes = {
    children: PropTypes.element.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  };

  componentDidMount() {
    this.onDownload();
  }

  onDownload() {
    ipcRenderer.on('download-success', (event, args) => {
      const { savePath, filename, id, img, fullname, winExe } = args
      const game = {
        _id: id,
        img,
        name: fullname
      }

      if (savePath.includes('.zip')) {
        let unzipTo = savePath.substring(0, savePath.length - filename.length)
        if(process.platform === 'darwin') {
          this.unzipMac(id, savePath, filename, unzipTo);
        }
        else {
          this.unzipWindows(id, savePath, filename, unzipTo, winExe);
        }
      }
      else {
        localStorage.setItem(id, savePath);
      }
      this.notifyDownload(game)
    });
  }

  unzipMac(id, savePath, filename, unzipTo) {
    const child = exec(`unzip ${savePath} -d ${unzipTo}`, (error, stdout, stderr) => {
      if (error) { throw error }
    });

    let unzippedPath = savePath.replace(filename, '*.app');

    // Save storage path
    localStorage.setItem(id, unzippedPath);
  }

  unzipWindows(id, savePath, filename, unzipTo, winExe) {
    let unzipper = new DecompressZip(savePath);

    let unzippedPath
    if (winExe.includes('.exe')) {
      unzippedPath = savePath.replace(filename, winExe);
    }
    else {
      unzippedPath = savePath.replace(filename, winExe + '.exe');
    }

    // Save storage path
    localStorage.setItem(id, unzippedPath);

    unzipper.extract({ path: unzipTo });
  }

  notifyDownload(game) {
    console.log('getting to notify func');
    const { dispatch } = this.props;

    let token = localStorage.getItem('id_token');
    let currentUser = jwtDecode(token);

    dispatch(addGameToUserRequest(currentUser._id, game))
    dispatch(finishGameDownload());
    new Notification('Download complete!', {
      body: game.fullname + ' is now available on your Library.'
    })
  }

  signup(user) {
    const { dispatch } = this.props;
    dispatch(signupUser(user));
  }

  login(user) {
    const { dispatch } = this.props;
    dispatch(loginUser(user));
  }

  logout() {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  render() {
    const { isAuthenticated, errorMessage } = this.props;

    return (
      <div className="app">
        {!isAuthenticated &&
          <Login signup={this.signup} login={this.login} errorMessage={errorMessage}/>
        }
        {isAuthenticated &&
          <div id="container">
            <section id="menu">
              <Menu logout={this.logout}/>
            </section>
            <div id="content-container">
              {this.props.children}
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
    errorMessage: state.auth.errorMessage
  }
}

export default connect(mapStateToProps)(App);
