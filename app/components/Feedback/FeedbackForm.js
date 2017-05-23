// @flow
import React, { Component } from 'react';
import $ from 'jquery';
import toastr from 'toastr';
import swal from 'sweetalert';

import type { Game, Feedback } from '../../utils/globalTypes';

type Props = {
  game: Game,
  handleFeedback: (feedback: Feedback) => void,
  userId: string
};

export default class FeedbackForm extends Component {
  state: {
    selectedUX: string
  }

  selectUX: (e: SyntheticMouseEvent) => void;
  submit: (e: SyntheticEvent | SyntheticMouseEvent) => void;

  static closeModal(e) {
    e.preventDefault();

    swal({
      title: 'Are you sure?',
      text: 'You will not receive any points for testing if you don\'t give any feedback.',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, I don\'t want to help',
      closeOnConfirm: true
    },
    () => {
      $('#feedbackForm').modal('hide');
    });
  }

  constructor(props: Props) {
    super(props);

    this.state = {
      selectedUX: 'Awesome game'
    };

    this.selectUX = this.selectUX.bind(this);
    this.submit = this.submit.bind(this);
  }

  selectUX(e: SyntheticMouseEvent) {
    e.preventDefault();
    const $target = $(e.target);

    if ($target.hasClass('active')) {
      return;
    }

    $target.addClass('active');
    $target.siblings().removeClass('active');

    this.setState({ selectedUX: $target.text() });
    console.log($target.text());
  }

  submit(e: SyntheticEvent | SyntheticMouseEvent) {
    e.preventDefault();

    const { handleFeedback, game, userId } = this.props;

    const goodElem = (document.getElementById('goodText'): any);
    const betterElem = (document.getElementById('betterText'): any);
    const bestElem = (document.getElementById('bestText'): any);

    const good = goodElem.value;
    const better = betterElem.value;
    const best = bestElem.value;

    if (good.length === 0 || better.length === 0 || best.length === 0) {
      toastr.error('All fields must be filled');
    }

    const feedback = {
      good,
      better,
      best,
      overallUX: this.state.selectedUX,
      gameId: game._id,
      sender: userId
    };

    goodElem.value = '';
    betterElem.value = '';
    bestElem.value = '';

    handleFeedback(feedback);
  }

  render() {
    const { game } = this.props;
    return (
      <div className="modal fade" id="feedbackForm" role="dialog">
        <div className="modal-dialog ff">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Make <span className="ff-gname">{game.name}</span> better!</h4>
              <a href="#close" className="close-btn" onClick={FeedbackForm.closeModal}><i className="fa fa-times" /></a>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="ff-input-group">
                  <p className="login-tag ff">What did you like about this game?</p>
                  <textarea className="ff-textarea" type="text" id="goodText" />
                </div>
                <div className="ff-input-group">
                  <p className="login-tag ff">What would you improve?</p>
                  <textarea className="ff-textarea" type="text" id="betterText" />
                </div>
                <div className="ff-input-group">
                  <p className="login-tag ff">What was your favorite thing about this game?</p>
                  <textarea className="ff-textarea" type="text" id="bestText" />
                </div>
                <div className="ux-picker">
                  <p className="login-tag ff">Rate your overall experience</p>
                  <br />
                  <a href="#good" className="ux ux-good active" onClick={this.selectUX}>Awesome game</a>
                  <a href="#medium" className="ux ux-medium" onClick={this.selectUX}>Minor issues, good overall</a>
                  <a href="#issues" className="ux ux-issues" onClick={this.selectUX}>Had a lot of issues</a>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <a href="#play" className="btn play-btn" onClick={this.submit}>Submit</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
