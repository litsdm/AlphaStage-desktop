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
      selectedGame: props.games[0],
      selectedFeedback: props.feedback[0][0],
      selectedIndex: 0,
      tabIndex: 0
    };

    this.displayModal = this.displayModal.bind(this);
    this.handleGameSwitch = this.handleGameSwitch.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  closeDropdown(e) {
    if ($(e.target)[0] != $('.drop-btn')[0]) {
      if ($('#myDropdown').hasClass('show')) {
        $('#myDropdown').removeClass('show');
      }
    }
  }

  displayModal(feedback, index) {
    this.setState({selectedFeedback: feedback})
    $("#myModal").modal();

    if (feedback.mark === 0) {
      const { markFeedback } = this.props;
      markFeedback(feedback, 1, index, this.state.selectedIndex);
    }
  }

  handleGameSwitch(event) {
    event.preventDefault();

    const $parent = $(event.target).parent();

    if ($parent.hasClass('active')) { return; }

    const { games } = this.props;
    const index = event.target.id;

    $('.ug-name').removeClass('active');
    $('.ug-name').siblings().removeClass('active');

    $parent.addClass('active');
    $parent.siblings().addClass('active');

    this.setState({
      selectedGame: games[index],
      selectedIndex: index
    });
  }

  handleFilterChange(e) {
    e.preventDefault();

    const stringId = e.target.id
    const id = parseInt(stringId)

    const $target = $(e.target)
    $target.siblings().removeClass('active')
    $target.addClass('active')

    this.setState({ tabIndex: id })
  }

  render() {
    const { games, feedback, currentUser } = this.props;
    const { selectedGame, selectedFeedback, selectedIndex, tabIndex } = this.state;
    const feedbacks = feedback[selectedIndex];

    return(
      <div className="dashboard" onClick={this.closeDropdown}>
        <div className="analytics-container">
          <AnalyticsGrid />
        </div>
        <div className="feedback-container">
          <div className="fbl-container">
            <h2>Feedback</h2>
            <FeedbackList feedback={feedbacks} displayModal={this.displayModal} bgURL={selectedGame.backgroundImg}/>
          </div>
        </div>
          {selectedFeedback &&
            <FeedbackModal feedback={selectedFeedback}/>
          }
      </div>
    )
  }
}
