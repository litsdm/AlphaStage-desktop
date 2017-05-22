// @flow
import React, { Component } from 'react';
import toastr from 'toastr';

import type { Credentials } from '../utils/globalTypes';

type Props = {
  isLoading: boolean,
  toggleState: () => void,
  login: (user: Credentials) => void,
  validateEmail: (email: string) => boolean
};

export default class LoginBox extends Component {
  goToSignup: (e: SyntheticMouseEvent) => void;
  handleLogin: (e: SyntheticMouseEvent | SyntheticEvent) => void;

  constructor(props: Props) {
    super(props);

    toastr.options.preventDuplicates = true;

    this.goToSignup = this.goToSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  goToSignup(e: SyntheticMouseEvent) {
    e.preventDefault();

    const { toggleState } = this.props;
    toggleState();
  }

  handleLogin(e: SyntheticMouseEvent | SyntheticEvent) {
    e.preventDefault();
    const { login, validateEmail } = this.props;

    const emailElem = (document.getElementById('logEmail'): any);
    const passwordElem = (document.getElementById('logPassword'): any);

    if (!emailElem || !passwordElem) {
      return;
    }

    const email = emailElem.value.trim().toLowerCase();
    const password = passwordElem.value;

    if (email.length === 0 || password.length === 0) {
      toastr.error('All fields must be filled.');
      return;
    }

    if (!validateEmail(email)) {
      toastr.error('Invalid email address.');
      return;
    }

    if (password.length < 3) {
      toastr.error('Invalid password.');
      return;
    }

    const user = {
      email,
      password
    };

    login(user);
  }

  render() {
    const { isLoading } = this.props;

    return (
      <div className="login-box">
        <form onSubmit={this.handleLogin}>
          <div className="login-input-div">
            <p className="login-tag">EMAIL</p>
            <div className="input-group">
              <div className="input-group-addon login-icon"><i className="fa fa-envelope" /></div>
              <input id="logEmail" type="email" className="form-control login-input" />
            </div>
          </div>
          <div className="login-input-div">
            <p className="login-tag">PASSWORD</p>
            <div className="input-group">
              <div className="input-group-addon login-icon"><i className="fa fa-key" /></div>
              <input id="logPassword" type="password" className="form-control login-input" />
            </div>
          </div>
          <div className="lb-div">
            {isLoading &&
              <a href="#logindis" className="btn play-btn logbtn disable">Login <i className="fa fa-spinner fa-pulse fa-fw" /></a>
            }
            {!isLoading &&
              <a href="#login" className="btn play-btn logbtn" onClick={this.handleLogin}>Login</a>
            }
            <input className="hidden" type="submit" value="Submit" onSubmit={this.handleLogin} />
          </div>
        </form>
        <p className="switch-p">New to alpha Stage? <a href="#switch" className="switch-ls" onClick={this.goToSignup}>Sign up now!</a></p>
      </div>
    );
  }
}
