// @flow
import React, { Component } from 'react';
import toastr from 'toastr';

import LoginBox from './LoginBox';
import SignupBox from './SignupBox';

import type { Credentials, NewUser } from '../utils/globalTypes';

type Props = {
  errorMessage?: string,
  resetError: () => void,
  login: (user: Credentials) => void,
  signup: (user: NewUser) => void
};

class Login extends Component {
  state: {
    isUserNew: boolean,
    isLoading: boolean
  }

  toggleState: () => void;
  handleLogin: (user: Credentials) => void;
  handleSignup: (user: NewUser) => void;

  static validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  constructor(props: Props) {
    super(props);

    this.state = {
      isUserNew: false,
      isLoading: false
    };

    this.toggleState = this.toggleState.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  componentDidUpdate() {
    const { errorMessage } = this.props;

    if (errorMessage) {
      this.updateErrorMessage(errorMessage);
    }
  }

  updateErrorMessage(errorMessage: string) {
    const { resetError } = this.props;
    toastr.error(errorMessage);
    this.setState({ isLoading: false });
    resetError();
  }

  handleLogin(user: Credentials) {
    const { login } = this.props;

    this.setState({ isLoading: true });

    login(user);
  }

  handleSignup(user: NewUser) {
    const { signup } = this.props;

    this.setState({ isLoading: true });

    signup(user);
  }

  toggleState() {
    this.setState({ isUserNew: !this.state.isUserNew });
  }

  render() {
    const { isUserNew, isLoading } = this.state;

    return (
      <div className="login">
        {isUserNew &&
          <SignupBox
            toggleState={this.toggleState} signup={this.handleSignup}
            validateEmail={Login.validateEmail} isLoading={isLoading}
          />
        }
        {!isUserNew &&
          <LoginBox
            toggleState={this.toggleState} login={this.handleLogin}
            validateEmail={Login.validateEmail} isLoading={isLoading}
          />
        }
      </div>
    );
  }
}

export default Login;
