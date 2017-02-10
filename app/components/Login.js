import React, { Component } from 'react';

import LoginBox from './LoginBox';
import SignupBox from './SignupBox';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { isUserNew: false }

    this.toggleState = this.toggleState.bind(this);
  }

  handleLogin() {

  }

  handleSignup() {

  }

  toggleState() {
    this.setState({ isUserNew: !this.state.isUserNew })
  }

  render() {
    return (
      <div className="login">
        {this.state.isUserNew &&
          <SignupBox toggleState={this.toggleState}/>
        }
        {!this.state.isUserNew &&
          <LoginBox toggleState={this.toggleState}/>
        }
      </div>
    )
  }
}
