import React, { Component } from 'react';

export default class SignupBox extends Component {
  constructor(props) {
    super(props);

    this.goToLogin = this.goToLogin.bind(this);
  }

  goToLogin(e) {
    e.preventDefault();

    const { toggleState } = this.props;
    toggleState();
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
            <input type="text" className="form-control login-input" ref="user"/>
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
          <a href="#" className="btn play-btn logbtn">Signup</a>
        </div>
        <p className="switch-p">Already have an account? <a href="#" className="switch-ls" onClick={this.goToLogin}>Login here</a></p>
      </div>
    )
  }
}
