import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';

const spawn = require('child_process').spawn;

import { signupUser, loginUser } from '../actions/auth';

import Menu from '../components/Menu/Menu';
import Login from '../components/Login';

class App extends Component {
  constructor(props) {
    super(props);

    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  static propTypes = {
    children: PropTypes.element.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  };

  componentDidMount() {
    ipcRenderer.on('download-success', (event, args) => {
      console.log("donlod success");

      const { savePath, filename, id } = args

      if (savePath.includes('.zip')) {
        let unzipTo = savePath.substring(0, savePath.length - filename.length)
        console.log(unzipTo);

        const unzipProcess = spawn('unzip', [savePath, '-d', unzipTo]);
        let unzippedPath;
        if (process.platform === 'darwin') {
          unzippedPath = savePath.replace('.zip', '.app');
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
      //swal("Download complete!", "You can now play this game from your Library.", "success")
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

  render() {
    const { isAuthenticated } = this.props;

    return (
      <div className="app">
        {!isAuthenticated &&
          <Login signup={this.signup} login={this.login}/>
        }
        {isAuthenticated &&
          <div id="container">
            <section id="menu">
              <Menu />
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
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(App);
