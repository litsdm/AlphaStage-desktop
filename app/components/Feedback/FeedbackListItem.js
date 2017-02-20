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

  componentDidMount() {
    const { bgURL } = this.props;

    $('.bg-img').css('background-image', 'url(' + bgURL + ')');
  }

  render() {
    const { feedback } = this.props;
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
        <div className="bg-img"></div>
        <div className="gli">
          <p className="string-date">{dateStr}</p>
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
