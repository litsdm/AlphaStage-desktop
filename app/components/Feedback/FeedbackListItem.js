import React, { Component } from 'react';
var dateFormat = require('dateformat');
import $ from 'jquery';

export default class FeedbackListItem extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    e.preventDefault();
    const { feedback, handleClick } = this.props;
    handleClick(feedback)
  }

  render() {
    const { feedback } = this.props;
    let gameplay = feedback.gameplay
    const date = dateFormat(gameplay.createdAt, "ddd, mmm d, h:MM TT");


    return(
      <a href="#" className="show-modal" onClick={this.onClick}>
        <div className="bg-img"></div>
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
      </a>
    )
  }
}
