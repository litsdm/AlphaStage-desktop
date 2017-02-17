import React, { Component } from 'react';
import $ from 'jquery';

export default class DashboardHeader extends Component {
  handleDropdownClick(e) {
    e.preventDefault();

    $('#myDropdown').toggleClass('show');
  }

  render() {
    const { currentUser } = this.props;

    return (
      <div className="dashboard-header">
        <span className="dh-content-left">
          <div className="dropdown">
            <a href="#" className="drop-btn" onClick={this.handleDropdownClick}>
              <img src={currentUser.profilePic} className="group-img small"/>
              Your games
              <i className="fa fa-chevron-down"></i>
            </a>
            <div id="myDropdown" className="dropdown-content">
              <span className="dropdown-header">Switch dashboard</span>
              <a href="#">Groups comming soon</a>
            </div>
          </div>
        </span>
        <span className="dh-content-right">
        </span>
      </div>
    )
  }
}
