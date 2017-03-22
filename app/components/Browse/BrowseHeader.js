import React, { Component } from 'react';
import $ from 'jquery';

export default class BrowseHeader extends Component {
  handleFilterClick(event) {
    event.preventDefault();

    const $target = $(event.target);
    $target.addClass('active');

    $target.siblings().removeClass('active');
  }

  render() {
    return (
      <div className="browse-header">
        <div id='stars'></div>
        <div id='stars2'></div>
        <div id='stars3'></div>
        <div id="browse-filters">
          <div className="filters-div">
            {/*<a href="#" className="first active" onClick={this.handleFilterClick}>Popular</a>
            <a href="#" onClick={this.handleFilterClick}>Trending</a>
            <a href="#" onClick={this.handleFilterClick}>New</a>
            <a href="#" className="last" onClick={this.handleFilterClick}>Mac Only</a>*/}
            <a href="#" className="first active">All Games</a>
          </div>
        </div>
      </div>
    );
  }
}
