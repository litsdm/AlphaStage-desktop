import React, { Component } from 'react';
var dateFormat = require('dateformat');
import $ from 'jquery';
import timeago from '../../utils/timeago';

export default class FeedbackListItem extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    const { feedback, handleClick, index } = this.props;
    handleClick(feedback, index)
  }

  render() {
    const { feedback, markClass } = this.props;
    let gameplay = feedback.gameplay

    let dateStr = $.timeago(feedback.createdAt)
    dateStr = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

    let quote;
    if (feedback.better.length < 72) {
      quote = feedback.better;
    }
    else {
      quote = feedback.better.substring(0, 72) + "...";
    }

    return(
      <a href="#" className="show-modal" onClick={this.onClick}>
        <div className={markClass + " gli"}>
          <p className="string-date">{dateStr}</p>
          <div className="leftify play-ic">
            <i className="fa fa-play-circle fa-5x"></i>
          </div>
          <p>By {feedback.sender ? feedback.sender.username : "User"}</p>
          <p>
            Overall: <span className="good-color">{feedback.overallUX}</span>
          </p>
          <p className="quote">"{quote}"</p>
        </div>
      </a>
    )
  }
}
