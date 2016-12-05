/*
* Created on Tue Nov 8 2016
*
* Side-bar menu header component containing the user profile pic and username
* and the search bar component.
*
*/

import React, { Component } from 'react';
import { Link } from 'react-router';

import SearchBar from './SearchBar';

export default class MenuHeader extends Component {
  render() {
    return (
      <div className="menu-header">
        <div className="menu-user container">
          <div className="row flex-items-xs-center center-align">
            <Link to="#"><img src="http://www.sheffield.com/wp-content/uploads/2013/06/placeholder.png" className="circular-img"/></Link>
          </div>
          <div className="row flex-items-xs-center center-align">
            <Link to="#">Username</Link>
          </div>
          <div className="row flex-items-xs-center center-align search-bar">
            <SearchBar />
          </div>
        </div>
      </div>
    )
  }
}
