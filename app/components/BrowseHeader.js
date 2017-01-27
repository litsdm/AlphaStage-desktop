import React, { Component } from 'react';

export default class BrowseHeader extends Component {
  render() {
    return (
      <div className="browse-header">
        <div id='stars'></div>
        <div id='stars2'></div>
        <div id='stars3'></div>
        <div id='title'>
          <span>Browse</span>
        </div>
        <div id="browse-filters">
          <div className="filters-div">
            <span>Popular</span>
            <span>Trending</span>
            <span>New</span>
            <span>Mac Only</span>
          </div>
        </div>
      </div>
    );
  }
}
