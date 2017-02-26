import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';

const exec = require('child_process').exec;

import { signupUser, loginUser, logoutUser } from '../actions/auth';
import { finishGameDownload } from '../actions/download';

import Menu from '../components/Menu/Menu';
import Login from '../components/Login';

class App extends Component {
  constructor(props) {
    super(props);

    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  static propTypes = {
    children: PropTypes.element.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  };

  componentDidMount() {
    const { dispatch } = this.props;

    ipcRenderer.on('download-success', (event, args) => {

      const { savePath, filename, id } = args

      if (savePath.includes('.zip')) {
        let unzipTo = savePath.substring(0, savePath.length - filename.length)

        const child = exec(`unzip ${savePath} -d ${unzipTo}`, (error, stdout, stderr) => {
          if (error) { throw error }
        });
        let unzippedPath;
        if (process.platform === 'darwin') {
          unzippedPath = savePath.replace(filename, '*.app');
        }
        else {
          unzippedPath = savePath.replace('.zip', '.exe');
        }

        // Save storage path
        localStorage.setItem(id, unzippedPath);
      }
      else {
        localStorage.setItem(id, savePath);
      }

      dispatch(finishGameDownload());
      new Notification('Download complete!', {
        body: args.name + ' is now available on your Library.'
      })
    });
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
