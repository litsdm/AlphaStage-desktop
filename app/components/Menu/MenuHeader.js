/*
* Created on Tue Nov 8 2016
*
* Side-bar menu header component containing the user profile pic and username
* and the search bar component.
*
*/

import React, { Component } from 'react';
import { Link } from 'react-router';
import jwtDecode from 'jwt-decode';

import SearchBar from '../SearchBar';

export default class MenuHeader extends Component {
  render() {
    let token = localStorage.getItem('id_token');
    let currentUser = jwtDecode(token);

    return (
      <div className="menu-header">
        <div className="menu-user container">
          <div className="row flex-items-xs-center center-align">
            <Link to="/" className="menu-profile">
            <img src="http://cdn.akamai.steamstatic.com/steamcommunity/public/images/avatars/9c/9c69ecc8b03e5abeec30cf93b46652fc56c8324b_full.jpg" className="circular-img"/>
            <p className="username">
              {currentUser.username}
            </p>
          </Link>
          </div>

          <div className="row flex-items-xs-center center-align search-bar">
            <SearchBar />
          </div>
        </div>
      </div>
    )
  }
}
