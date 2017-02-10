import React, { Component } from 'react';

import LoginBox from './LoginBox';
import SignupBox from './SignupBox';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { isUserNew: false }

    this.toggleState = this.toggleState.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleLogin(user) {
    const { login } = this.props;

    login(user);
  }

  handleSignup(user) {
    const { signup } = this.props;

    signup(user);
  }

  toggleState() {
    this.setState({ isUserNew: !this.state.isUserNew })
  }

  render() {
    return (
      <div className="login">
        {this.state.isUserNew &&
          <SignupBox toggleState={this.toggleState} signup={this.handleSignup}/>
        }
        {!this.state.isUserNew &&
          <LoginBox toggleState={this.toggleState} login={this.handleLogin}/>
        }
      </div>
    )
  }
}
