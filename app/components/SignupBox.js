import React, { Component } from 'react';
import toastr from 'toastr';

export default class SignupBox extends Component {
  constructor(props) {
    super(props);

    toastr.options.preventDuplicates = true;


    this.goToLogin = this.goToLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
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

    let user = {
      email,
      username,
      password
    }

    signup(user);
  }

  render() {
    return (
      <div className="signup-box">
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
        <div className="lb-div">
          <a href="#" className="btn play-btn logbtn" onClick={this.handleSignup}>Signup</a>
        </div>
        <p className="switch-p">Already have an account? <a href="#" className="switch-ls" onClick={this.goToLogin}>Login!</a></p>
      </div>
    )
  }
}
