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

    this.state = {
      selectedGame: props.games[0],
      selectedFeedback: props.feedback[0][0],
      selectedIndex: 0
    };

    this.displayModal = this.displayModal.bind(this);
    this.handleGameSwitch = this.handleGameSwitch.bind(this);
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

    $parent.addClass('active');
    $parent.siblings().removeClass('active');

    this.setState({
      selectedGame: games[index],
      selectedIndex: index
    });
  }

  render() {
    const { games, feedback, currentUser } = this.props;
    const { selectedGame, selectedFeedback, selectedIndex } = this.state;
    const feedbacks = feedback[selectedIndex];

    const gameListItems = games.map((game, i) => {
      if (i == 0) {
        return <a href="#" className="ug-name active" onClick={this.handleGameSwitch} key={i}><p id={i}>{game.name}</p></a>
      }

      return <a href="#" className="ug-name" onClick={this.handleGameSwitch} key={i}><p id={i}>{game.name}</p></a>
    });

    return(
      <div className="dashboard" onClick={this.closeDropdown}>
        <DashboardHeader currentUser={currentUser}/>
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <FeedbackList feedback={feedbacks} displayModal={this.displayModal} bgURL={selectedGame.backgroundImg}/>
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
          {selectedFeedback &&
            <FeedbackModal feedback={selectedFeedback}/>
          }
        </div>
      </div>
    )
  }
}
