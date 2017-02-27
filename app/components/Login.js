import React, { Component } from 'react';
import toastr from 'toastr';

import LoginBox from './LoginBox';
import SignupBox from './SignupBox';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUserNew: false,
      isLoading: false
     }

    this.toggleState = this.toggleState.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  componentDidUpdate() {
    const { errorMessage, resetError } = this.props;

    if (errorMessage) {
      toastr.error(errorMessage);
      this.setState({ isLoading: false });
      resetError()
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  handleLogin(user) {
    const { login } = this.props;

    this.setState({ isLoading: true });

    login(user);
  }

  handleSignup(user) {
    const { signup } = this.props;

    this.setState({ isLoading: true });

    signup(user);
  }

  toggleState() {
    this.setState({ isUserNew: !this.state.isUserNew })
  }

  render() {
    const { isUserNew, isLoading } = this.state;

    return (
      <div className="login">
        {isUserNew &&
          <SignupBox toggleState={this.toggleState} signup={this.handleSignup}
            validateEmail={this.validateEmail} isLoading={isLoading} />
        }
        {!isUserNew &&
          <LoginBox toggleState={this.toggleState} login={this.handleLogin}
            validateEmail={this.validateEmail} isLoading={isLoading} />
        }
      </div>
    )
  }
}
