import React, { Component } from 'react';

export default class GameplayListItem extends Component {
  render() {
    return(
      <div className="gli">
        <div className="row">
          <div className="col-md-4">
            <p>Image preview</p>
          </div>
          <div className="col-md-4">
            <p>Gamplay no. x</p>
          </div>
          <div className="col-md-4">
            <p>Date</p>
          </div>
        </div>
      </div>
    )
  }
}
