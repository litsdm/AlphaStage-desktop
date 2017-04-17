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

    const gameListItems = games.map((game, i) => {
      let gameItem;
      let editGamePath = `/games/new?id=${game._id}`;

      if (i == 0) {
        gameItem = (
          <span key={i}>
            <Link to={editGamePath} className="ug-edit active"><i className="fa fa-pencil"></i></Link>
            <a href="#" className="ug-name active" onClick={this.handleGameSwitch}><p id={i}>{game.name}</p></a>
          </span>
        )
      }
      else {
        gameItem = (
          <span key={i}>
            <Link to={editGamePath} className="ug-edit"><i className="fa fa-pencil"></i></Link>
            <a href="#" className="ug-name" onClick={this.handleGameSwitch}><p id={i}>{game.name}</p></a>
          </span>
        )
      }

      return gameItem;
    });

    return(
      <div className="dashboard" onClick={this.closeDropdown}>
        <div className="container">
          <div className="row">
            <div className="col-md-9">
              <div className="dashc-left">
                <div className="dash-filters">
                  <a href="#" className="active" id="0" onClick={this.handleFilterChange}>Feedback</a>
                  <a href="#" id="1" onClick={this.handleFilterChange}>Analytics</a>
                </div>
                {tabIndex === 0 &&
                  <FeedbackList feedback={feedbacks} displayModal={this.displayModal} bgURL={selectedGame.backgroundImg}/>
                }
                {tabIndex === 1 &&
                  <AnalyticsGrid />
                }
              </div>
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
