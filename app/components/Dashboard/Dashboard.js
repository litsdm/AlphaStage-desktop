import React, { Component } from 'react';
import { Link } from 'react-router';
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

    console.log(props.games);

    this.state = {
      selectedGame: props.games[0],
      selectedFeedback: props.games[0].feedbacks[0]
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

  displayModal(feedback) {
    this.setState({selectedFeedback: feedback})
    $("#myModal").modal();
  }

  render() {
    const { games, currentUser } = this.props;
    const { feedbacks } = this.state.selectedGame;

    const gameListItems = games.map((game, i) => {
      if (i == 0) {
        return <a href="#" className="ug-name active"><p>{game.name}</p></a>
      }

      return <a href="#" className="ug-name"><p>{game.name}</p></a>
    });

    return(
      <div className="dashboard" onClick={this.closeDropdown}>
        <DashboardHeader currentUser={currentUser}/>
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <FeedbackList feedback={feedbacks} displayModal={this.displayModal} />
            </div>
            <div className="col-md-3">
              <div className="user-games">
                <div className="ug-header">
                  <Link className="create-btn" to="/games/new"><i className="fa fa-plus create-icon"></i> New Game</Link>
                </div>
                <p className="ug-title">Your Games</p>
                {gameListItems}
              </div>
            </div>
          </div>
          <FeedbackModal feedback={this.state.selectedFeedback}/>
        </div>
      </div>
    )
  }
}
