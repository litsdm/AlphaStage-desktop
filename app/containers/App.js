import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

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
