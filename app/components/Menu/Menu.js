/**
* Created on Tue Nov 8 2016
*
* Side-bar menu itself containing all of the side-bar's components.
*
* @flow
*/

import React, { Component } from 'react';

import MenuHeader from './MenuHeader';
import MenuList from './MenuList';

type Props = {
  logout: () => void,
  path: string
};

class Menu extends Component {

  handleLogout: (e: SyntheticMouseEvent) => void;

  constructor(props: Props) {
    super(props);

    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e: SyntheticMouseEvent) {
    e.preventDefault();
    const { logout } = this.props;

    logout();
  }

  render() {
    const { path } = this.props;

    return (
      <div className="menu">
        <MenuHeader />
        <MenuList path={path} />
        <span className="content-botright">
          <a href="#logout" className="logout-btn" onClick={this.handleLogout}><i className="fa fa-sign-out" /></a>
        </span>
        <span className="content-botleft">
          <span className="v-tag">v0.9.0</span>
        </span>
      </div>
    );
  }
}

export default Menu;
