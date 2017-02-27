import React, { Component } from 'react';
import toastr from 'toastr';
import $ from 'jquery';

export default class SignupBox extends Component {
  constructor(props) {
    super(props);

    toastr.options.preventDuplicates = true;

    this.state = {
      isDeveloper: true
    }

    this.goToLogin = this.goToLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.selectRole = this.selectRole.bind(this);
  }

  goToLogin(e) {
    e.preventDefault();

    const { toggleState } = this.props;
    toggleState();
  }

  handleSignup(e) {
    e.preventDefault();
    const { signup, validateEmail } = this.props;

    const email = this.refs.email.value;
    const username = this.refs.username.value;
    const password = this.refs.password.value;

    if (username.length === 0 || email.length === 0 || password.length === 0) {
      toastr.error('All fields must be filled.');
      return
    }

    if (!validateEmail(email)) {
      toastr.error('Invalid email address');
      return
    }

    if (password.length < 3) {
      toastr.error('Password too short');
      return
    }

    let { isDeveloper } = this.state;

    let user = {
      email,
      username,
      password,
      isDeveloper
    }

    signup(user);
  }

  selectRole(e) {
    e.preventDefault();
    if ($(e.target).hasClass('active')) {
      return
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
              <div className="input-group-addon login-icon"><i className="fa fa-envelope"></i></div>
              <input type="email" className="form-control login-input" ref="email"/>
            </div>
          </div>
          <div className="login-input-div">
            <p className="login-tag">USERNAME</p>
            <div className="input-group">
              <div className="input-group-addon login-icon"><i className="fa fa-user"></i></div>
              <input type="text" className="form-control login-input" ref="username"/>
            </div>
          </div>
          <div className="login-input-div">
            <p className="login-tag">PASSWORD</p>
            <div className="input-group">
              <div className="input-group-addon login-icon"><i className="fa fa-key"></i></div>
              <input type="password" className="form-control login-input" ref="password"/>
            </div>
          </div>
          <p className="login-tag">ARE YOU A</p>
          <div className="row t-center">
            <div className="col-md-5">
              <a href="#" className="dev-select active" onClick={this.selectRole}>Developer</a>
            </div>
            <div className="col-md-2">
              <p className="login-tag">OR</p>
            </div>
            <div className="col-md-5">
              <a href="#" className="player-select" onClick={this.selectRole}>Player</a>
            </div>
          </div>
          <div className="lb-div">
            {isLoading &&
              <a href="#" className="btn play-btn logbtn downloading">Signup <i className="fa fa-spinner fa-pulse fa-fw"></i></a>
            }
            {!isLoading &&
              <a href="#" className="btn play-btn logbtn" onClick={this.handleSignup}>Signup</a>
            }
            <input className="hidden" type="submit" value="Submit" onSubmit={this.handleSignup}/>
          </div>
        </form>
        <p className="switch-p">Already have an account? <a href="#" className="switch-ls" onClick={this.goToLogin}>Login!</a></p>
      </div>
    )
  }
}
