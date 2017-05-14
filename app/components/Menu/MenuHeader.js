/**
* Created on Tue Nov 8 2016
*
* Side-bar menu header component containing the user profile pic and username
* and the search bar component.
*
*/

import React, { Component } from 'react';
import { Link } from 'react-router';
import jwtDecode from 'jwt-decode';

// import SearchBar from '../SearchBar';

export default class MenuHeader extends Component {
  render() {
    const token = localStorage.getItem('id_token');
    const currentUser = jwtDecode(token);

    return (
      <div className="menu-header">
        <div className="menu-user container">
          <div className="row flex-items-xs-center center-align">
            <Link className="menu-profile">
              <img src={currentUser.profilePic} className="circular-img" alt="" />
              <p className="username">
                {currentUser.username}
              </p>
            </Link>
          </div>

          {/* <div className="row flex-items-xs-center center-align search-bar">
            <SearchBar />
          </div>*/}
        </div>
      </div>
    );
  }
}
