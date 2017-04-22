import React, { Component } from 'react';

import FeedbackListItem from './FeedbackListItem';

export default class FeedbackList extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(feedback, index) {
    const { displayModal } = this.props;
    displayModal(feedback, index)
  }

  render() {
    const { feedback } = this.props

    const listItems = feedback.map((feedback, i) => {
      let markClass = ""
      switch (feedback.mark) {
        case 1:
          markClass = "seen"
          break;
        default: markClass = "";

      }

      return (
        <li key={feedback.gameplay._id}>
          <FeedbackListItem
            index={i} feedback={feedback} handleClick={this.handleClick}
            markClass={markClass}
          />
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
