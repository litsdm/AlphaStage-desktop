import React, { Component } from 'react';
import { Link } from 'react-router';

export default class MenuList extends Component {
  render() {
    return (
      <div className="menu-list container">
        <div className="menu-category">
          <span className="menu-title">Main</span>
          <ul className="menu-ul">
            <Link to="#" className="menu-link">Browse</Link>
          </ul>
        </div>
        <div className="menu-category">
          <span className="menu-title">Library</span>
          <ul className="menu-ul">
            <p><Link to="#" className="menu-link">Your List</Link></p>
            <p><Link to="#" className="menu-link">Downloaded</Link></p>
            <p><Link to="#" className="menu-link">Reviewed</Link></p>
          </ul>
        </div>
      </div>
    );
  }
}
