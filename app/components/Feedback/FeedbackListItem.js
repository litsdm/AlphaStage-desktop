// @flow
import React, { Component } from 'react';
import $ from 'jquery';
// import timeago from '../../utils/timeago';
// const dateFormat = require('dateformat');

import type { Feedback } from '../../utils/globalTypes';

type Props = {
  feedback: Feedback,
  index: number,
  markClass: string,
  handleClick: (feedback: Feedback, index: number) => void
};

class FeedbackListItem extends Component {

  onClick: (e: SyntheticMouseEvent) => void;

  constructor(props: Props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e: SyntheticMouseEvent) {
    e.preventDefault();
    const { feedback, handleClick, index } = this.props;
    handleClick(feedback, index);
  }

  render() {
    const { feedback, markClass } = this.props;

    let dateStr = $.timeago(feedback.createdAt);
    dateStr = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

    let quote;
    if (feedback.better.length < 72) {
      quote = feedback.better;
    } else {
      quote = `${feedback.better.substring(0, 72)}...`;
    }

    return (
      <a href="#smodal" className="show-modal" onClick={this.onClick}>
        <div className={`${markClass} gli`}>
          <p className="string-date">{dateStr}</p>
          <div className="leftify play-ic">
            <i className="fa fa-play-circle fa-5x" />
          </div>
          <p>By {feedback.sender ? feedback.sender.username : 'User'}</p>
          <p>
            Overall: <span className="good-color">{feedback.overallUX}</span>
          </p>
          <p className="quote">{`"${quote}"`}</p>
        </div>
      </a>
    );
  }
}

export default FeedbackListItem;
