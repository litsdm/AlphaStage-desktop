import React, { Component } from 'react';

export default class LoginBox extends Component {
  render() {
    return(
      <div className="login-box">
        <p className="login-title">Welcome Back!</p>
        <div className="login-input-div">
          <p className="login-tag">Email</p>
          <input className="login-input" type="email" ref="email"/>
        </div>
        <div className="login-input-div">
          <p className="login-tag">Password</p>
          <input className="login-input" type="password" ref="password"/>
        </div>
        <div className="lb-div">
          <a href="#" className="btn play-btn logbtn">Login</a>
        </div>
        <p className="switch-p">New to alpha Stage? <a href="#" className="switch-ls">Sign up now!</a></p>
      </div>
    )
  }
}
