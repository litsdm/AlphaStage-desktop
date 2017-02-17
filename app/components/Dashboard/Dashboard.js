import React, { Component } from 'react';
import { Link } from 'react-router';
import jwtDecode from 'jwt-decode';
import $ from 'jquery';

// Quick fix to use bootstrap js, there is probably a better way
import tether from 'tether';
window.Tether = tether;
window.jQuery = $
require('bootstrap');

import DashboardHeader from './DashboardHeader';
import FeedbackList from '../Feedback/FeedbackList';
import FeedbackModal from '../Feedback/FeedbackModal';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {selectedFeedback: props.feedback[0]};

    this.displayModal = this.displayModal.bind(this);
  }

  closeDropdown(e) {
    if ($(e.target)[0] != $('.drop-btn')[0]) {
      if ($('#myDropdown').hasClass('show')) {
        $('#myDropdown').removeClass('show');
      }
    }
  }

  displayModal(feedback) {
    this.setState({selectedFeedback: feedback})
    $("#myModal").modal();
  }

  render() {
    const { feedback } = this.props
    let token = localStorage.getItem('id_token');
    let currentUser = jwtDecode(token);

    return(
      <div className="dashboard" onClick={this.closeDropdown}>
        <DashboardHeader currentUser={currentUser}/>
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <FeedbackList feedback={feedback} displayModal={this.displayModal} />
            </div>
            <div className="col-md-3">
              <div className="user-games">
                <div className="ug-header">
                  <Link className="create-btn" to="/games/new"><i className="fa fa-plus create-icon"></i> New Game</Link>
                </div>
                <p className="ug-title">Your Games</p>
                <a href="#" className="ug-name active"><p>Titan Souls</p></a>
                <a href="#" className="ug-name"><p>Lethal League</p></a>
              </div>
            </div>
          </div>
          <FeedbackModal feedback={this.state.selectedFeedback}/>
        </div>
      </div>
    )
  }
}
