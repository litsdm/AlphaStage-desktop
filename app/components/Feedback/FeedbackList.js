// @flow
import React, { Component } from 'react';

import FeedbackListItem from './FeedbackListItem';

import type { Feedback } from '../../utils/globalTypes';

type Props = {
  feedback: Feedback,
  displayModal: (feedback: Feedback, index: number) => void
};

export default class FeedbackList extends Component {

  feedbackItemClicked: (feedback: Feedback, index: number) => void;

  constructor(props: Props) {
    super(props);

    this.feedbackItemClicked = this.feedbackItemClicked.bind(this);
  }

  feedbackItemClicked(feedback: Feedback, index: number) {
    const { displayModal } = this.props;
    displayModal(feedback, index);
  }

  render() {
    const { feedback } = this.props;

    const listItems = feedback.map((fb, i) => {
      let markClass = '';
      switch (fb.mark) {
        case 1:
          markClass = 'seen';
          break;
        default: markClass = '';

      }

      return (
        <li key={feedback.gameplay._id}>
          <FeedbackListItem
            index={i} feedback={feedback} handleClick={this.feedbackItemClicked}
            markClass={markClass}
          />
        </li>
      );
    });
    return (
      <ul className="gameplays">
        {listItems}
      </ul>
    );
  }
}
