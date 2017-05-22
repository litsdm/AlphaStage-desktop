// @flow
import React, { Component } from 'react';
import toastr from 'toastr';
import $ from 'jquery';

import type { NewUser } from '../utils/globalTypes';

type Props = {
  isLoading: boolean,
  toggleState: () => void,
  validateEmail: (email: string) => boolean,
  signup: (user: NewUser) => void
};

export default class SignupBox extends Component {
  state: {
    isDeveloper: boolean
  }

  goToLogin: (e: SyntheticMouseEvent) => void;
  handleSignup: (e: SyntheticMouseEvent | SyntheticEvent) => void;
  selectRole: (e: SyntheticMouseEvent) => void;

  constructor(props: Props) {
    super(props);

    toastr.options.preventDuplicates = true;

    this.state = {
      isDeveloper: true
    };

    this.goToLogin = this.goToLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.selectRole = this.selectRole.bind(this);
  }

  goToLogin(e: SyntheticMouseEvent) {
    e.preventDefault();

    const { toggleState } = this.props;
    toggleState();
  }

  handleSignup(e: SyntheticMouseEvent | SyntheticEvent) {
    e.preventDefault();
    const { signup, validateEmail } = this.props;

    const emailElem = (document.getElementById('signEmail'): any);
    const usernameElem = (document.getElementById('signUsername'): any);
    const passwordElem = (document.getElementById('signPassword'): any);
    const comfirmPasswordElem = (document.getElementById('confirmPassword'): any);

    const email = emailElem.value.trim().toLowerCase();
    const username = usernameElem.value;
    const password = passwordElem.value;
    const confirmPassword = comfirmPasswordElem.value;

    if (username.length === 0 || email.length === 0 || password.length === 0) {
      toastr.error('All fields must be filled.');
      return;
    }

    if (!validateEmail(email)) {
      toastr.error('Invalid email address');
      return;
    }

    if (password.length < 3) {
      toastr.error('Password too short');
      return;
    }

    if (password !== confirmPassword) {
      toastr.error('Passwords do not match.');
      return;
    }

    const { isDeveloper } = this.state;

    const user = {
      email,
      username,
      password,
      isDeveloper
    };

    signup(user);
  }

  selectRole(e: SyntheticMouseEvent) {
    e.preventDefault();
    if ($(e.target).hasClass('active')) {
      return;
    }

    $('.player-select').toggleClass('active');
    $('.dev-select').toggleClass('active');

    this.setState({ isDeveloper: !this.state.isDeveloper });
  }

  render() {
    const { isLoading } = this.props;

    return (
      <div className="signup-box">
        <form onSubmit={this.handleSignup}>
          <div className="login-input-div">
            <p className="login-tag">EMAIL</p>
            <div className="input-group">
              <div className="input-group-addon login-icon"><i className="fa fa-envelope" /></div>
              <input id="signEmail" type="email" className="form-control login-input" />
            </div>
          </div>
          <div className="login-input-div">
            <p className="login-tag">USERNAME</p>
            <div className="input-group">
              <div className="input-group-addon login-icon"><i className="fa fa-user" /></div>
              <input id="signUsername" type="text" className="form-control login-input" />
            </div>
          </div>
          <div className="login-input-div">
            <p className="login-tag">PASSWORD</p>
            <div className="input-group">
              <div className="input-group-addon login-icon"><i className="fa fa-key" /></div>
              <input id="signPassword" type="password" className="form-control login-input" />
            </div>
          </div>
          <div className="login-input-div">
            <p className="login-tag">CONFIRM PASSWORD</p>
            <div className="input-group">
              <div className="input-group-addon login-icon"><i className="fa fa-key" /></div>
              <input id="confirmPassword" type="password" className="form-control login-input" />
            </div>
          </div>
          <p className="login-tag">ARE YOU A</p>
          <div className="row t-center">
            <div className="col-md-5">
              <a href="#devselect" className="dev-select active" onClick={this.selectRole}>Developer</a>
            </div>
            <div className="col-md-2">
              <p className="login-tag">OR</p>
            </div>
            <div className="col-md-5">
              <a href="#playerselect" className="player-select" onClick={this.selectRole}>Player</a>
            </div>
          </div>
          <div className="lb-div">
            {isLoading &&
              <a href="#signupdis" className="btn play-btn logbtn disable">Signup <i className="fa fa-spinner fa-pulse fa-fw" /></a>
            }
            {!isLoading &&
              <a href="#signup" className="btn play-btn logbtn" onClick={this.handleSignup}>Signup</a>
            }
            <input className="hidden" type="submit" value="Submit" onSubmit={this.handleSignup} />
          </div>
        </form>
        <p className="switch-p">Already have an account? <a href="#switch" className="switch-ls" onClick={this.goToLogin}>Login!</a></p>
      </div>
    );
  }
}
