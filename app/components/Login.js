import React, { Component } from 'react';

import LoginBox from './LoginBox';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    
  }

  render() {
    return (
      <div className="login">
        <LoginBox />
        {/*<SignupBox />*/}
      </div>
    )
  }
}
