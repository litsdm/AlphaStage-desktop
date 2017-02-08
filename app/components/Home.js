// @flow
import React, { Component } from 'react';
import $ from 'jquery';

// Quick fix to use bootstrap js, there is probably a better way
import tether from 'tether';
window.Tether = tether;
window.jQuery = $
require('bootstrap');

import FeedbackList from './Feedback/FeedbackList';
import FeedbackModal from './Feedback/FeedbackModal';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {selectedFeedback: props.feedback[0]};

    this.displayModal = this.displayModal.bind(this);
  }

  displayModal(feedback) {
    this.setState({selectedFeedback: feedback})
    $("#myModal").modal();
  }

  render() {
    const { feedback } = this.props

    return (
      <div className="container">
        <h1>Dashboard</h1>
        <div className="row">
          <div className="col-md-9">
            <FeedbackList feedback={feedback} displayModal={this.displayModal} />
          </div>
          <div className="col-md-3">
            <div className="user-games">
              <p className="ug-title">Your Games</p>
              <a href="#" className="ug-name active"><p>Titan Souls</p></a>
              <a href="#" className="ug-name"><p>Lethal League</p></a>
            </div>
          </div>
        </div>
        <FeedbackModal feedback={this.state.selectedFeedback}/>
      </div>
    )
  }
}
