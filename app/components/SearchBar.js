/*
* Created on Tue Nov 8 2016
*
* Searchbar component that handles user input for searching.
*
*/

import React, { Component } from 'react';

export default class SearchBar extends Component {
  render() {
    return (
      <form>
        <div className="form-group">
          <div className="input-group">
            <div className="input-group-addon"><i className="fa fa-search"></i></div>
            <input type="text" className="form-control" />
          </div>
        </div>
      </form>
    )
  }
}
