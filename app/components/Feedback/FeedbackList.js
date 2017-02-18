import React, { Component } from 'react';

import FeedbackListItem from './FeedbackListItem';

export default class FeedbackList extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(feedback) {
    const { displayModal } = this.props;
    displayModal(feedback)
  }

  render() {
    const { feedback, bgURL } = this.props

    const listItems = feedback.map((feedback, i) => {
      let seenClass = feedback.seen ? "seen" : ""

      return (
        <li className={seenClass} key={feedback.gameplay._id}>
          <FeedbackListItem feedback={feedback} handleClick={this.handleClick} bgURL={bgURL}/>
        </li>
      )
    });
    return (
      <ul className="gameplays">
        {listItems}
      </ul>
    )
  }
}
