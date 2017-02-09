import React, { Component } from 'react';

export default class LoginBox extends Component {
  render() {
    return(
      <div className="login-box">
        <div className="login-input-div">
          <p className="login-tag">EMAIL</p>
          <div className="input-group">
            <div className="input-group-addon login-icon"><i className="fa fa-envelope"></i></div>
            <input type="email" className="form-control login-input" ref="email"/>
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
          <a href="#" className="btn play-btn logbtn">Login</a>
        </div>
        <p className="switch-p">New to alpha Stage? <a href="#" className="switch-ls">Sign up now!</a></p>
      </div>
    )
  }
}
