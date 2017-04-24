import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

// Quick fix to use bootstrap js, there is probably a better way
import tether from 'tether';
window.Tether = tether;
window.jQuery = $
require('bootstrap');

import FeedbackList from '../Feedback/FeedbackList';
import FeedbackModal from '../Feedback/FeedbackModal';
import AnalyticsGrid from '../Dashboard/AnalyticsGrid';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFeedback: props.feedback[0][0],
    };

    this.displayModal = this.displayModal.bind(this);
  }

  closeDropdown(e) {
    if ($(e.target)[0] != $('.drop-btn')[0]) {
      if ($('#myDropdown').hasClass('show')) {
        $('#myDropdown').removeClass('show');
      }
    }
  }

  displayModal(feedback, index) {
    const { selectedIndex } = this.props;
    this.setState({selectedFeedback: feedback})
    $("#myModal").modal();

    if (feedback.mark === 0) {
      const { markFeedback } = this.props;
      markFeedback(feedback, 1, index, selectedIndex);
    }
  }

  render() {
    const { feedback, currentUser, selectedIndex, games } = this.props;
    const { selectedFeedback, tabIndex } = this.state;

    return(
      <div className="dashboard">
        <div className="analytics-container">
          <AnalyticsGrid game={games[selectedIndex]}/>
        </div>
        <div className="feedback-container">
          <div className="fbl-container">
            <h2>Feedback</h2>
            {feedback &&
              <FeedbackList feedback={feedback[selectedIndex]} displayModal={this.displayModal}/>
            }
          </div>
        </div>
        {selectedFeedback &&
          <FeedbackModal feedback={selectedFeedback}/>
        }
      </div>
    )
  }
}
