/*
* Created on Tue Nov 8 2016
*
* Side-bar menu itself containing all of the side-bar's components.
*
*/

import React, { Component } from 'react';

import MenuHeader from './MenuHeader';
import MenuList from './MenuList';

export default class Menu extends Component {
  constructor(props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    e.preventDefault();
    const { logout } = this.props;

    logout();
  }

  render() {
    const { path } = this.props;

    return(
      <div className="menu">
        <MenuHeader />
        <MenuList path={path}/>
        <span className="content-botright">
          <a href="#" className="logout-btn" onClick={this.handleLogout}><i className="fa fa-sign-out"></i></a>
        </span>
        <span className="content-botleft">
          <span className="v-tag">v0.9.0</span>
        </span>
      </div>
    )
  }
}
