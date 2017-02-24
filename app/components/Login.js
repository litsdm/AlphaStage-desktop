import React, { Component } from 'react';
import toastr from 'toastr';

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

  componentDidUpdate() {
    const { errorMessage } = this.props;

    if (errorMessage) {
      toastr.error(errorMessage);
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
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
          <SignupBox toggleState={this.toggleState} signup={this.handleSignup} validateEmail={this.validateEmail}/>
        }
        {!this.state.isUserNew &&
          <LoginBox toggleState={this.toggleState} login={this.handleLogin} validateEmail={this.validateEmail}/>
        }
      </div>
    )
  }
}
