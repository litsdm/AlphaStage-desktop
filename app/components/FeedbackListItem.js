import React, { Component } from 'react';
var dateFormat = require('dateformat');

export default class GameplayListItem extends Component {
  render() {
    const { gameplay } = this.props;
    const date = dateFormat(gameplay.createdAt, "ddd, mmm d, h:MM TT");

    return(
      <div className="gli">
        <div className="row">
          <div className="col-md-4">
            <p>[Image preview]</p>
          </div>
          <div className="col-md-4">
            <p>{gameplay.s3URL}</p>
          </div>
          <div className="col-md-4">
            <p className="gameplay-date">{date}</p>
          </div>
        </div>
      </div>
    )
  }
}
