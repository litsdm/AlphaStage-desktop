// @flow
import React, { Component } from 'react';
import $ from 'jquery';
import tether from 'tether';

import FeedbackList from '../Feedback/FeedbackList';
import FeedbackModal from '../Feedback/FeedbackModal';
import AnalyticsGrid from '../Dashboard/AnalyticsGrid';

import type { Feedback, Game } from '../../utils/globalTypes';

// Quick fix to use bootstrap js, there is probably a better way
window.Tether = tether;
window.jQuery = $;
require('bootstrap');

type Props = {
  feedback: Array<Feedback>,
  games: Array<Game>,
  selectedIndex: number,
  markFeedback: (feedback: Feedback, mark: number, childIndex: number, parentIndex: number) => void
};

export default class Dashboard extends Component {
  state: {
    selectedFeedback: Feedback
  };

  displayModal: (feedback: Feedback, index: number) => void;

  constructor(props: Props) {
    super(props);

    this.state = {
      selectedFeedback: props.feedback[0][0],
    };

    this.displayModal = this.displayModal.bind(this);
  }

  displayModal(feedback: Feedback, index: number) {
    const { selectedIndex } = this.props;
    this.setState({ selectedFeedback: feedback });
    $('#myModal').modal();

    if (feedback.mark === 0) {
      const { markFeedback } = this.props;
      markFeedback(feedback, 1, index, selectedIndex);
    }
  }

  render() {
    const { feedback, selectedIndex, games } = this.props;
    const { selectedFeedback } = this.state;

    return (
      <div className="dashboard">
        <div className="analytics-container">
          <AnalyticsGrid game={games[selectedIndex]} />
        </div>
        <div className="feedback-container">
          <div className="fbl-container">
            <h2>Feedback</h2>
            {feedback &&
              <FeedbackList feedback={feedback[selectedIndex]} displayModal={this.displayModal} />
            }
          </div>
        </div>
        {selectedFeedback &&
          <FeedbackModal feedback={selectedFeedback} />
        }
      </div>
    );
  }
}
