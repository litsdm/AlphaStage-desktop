import React, { Component } from 'react';
import { Link } from 'react-router';
import jwtDecode from 'jwt-decode';
import $ from 'jquery';

export default class MenuList extends Component {
  handleLinkClick(e) {
    let $parent = $(e.target).parent()

    if ($parent.hasClass('active')) {
      return
    }

    $('.menu-link').removeClass('active');
    $parent.toggleClass('active');
  }

  render() {
    let token = localStorage.getItem('id_token');
    let currentUser = jwtDecode(token);

    return (
      <div className="menu-list container">
        <div className="menu-category">
          <span className="menu-title">Main</span>
          <ul className="menu-ul">
            {currentUser.isDeveloper &&
              <p className="menu-link"><Link to="/dashboard" onClick={this.handleLinkClick}>Dashboard</Link></p>
            }
            <p className="menu-link active"><Link to="/" onClick={this.handleLinkClick}>Browse</Link></p>
          </ul>
        </div>
        <div className="menu-category">
          <span className="menu-title">Library</span>
          <ul className="menu-ul">
            <p className="menu-link"><Link to="/games/library" onClick={this.handleLinkClick}>Your library</Link></p>
          </ul>
        </div>
      </div>
    );
  }
}
