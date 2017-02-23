import React, { Component } from 'react';
import $ from 'jquery';
import toastr from 'toastr';
import swal from 'sweetalert';

export default class FeedbackForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedUX: "Awesome game"
    }

    this.selectUX = this.selectUX.bind(this);
    this.submit = this.submit.bind(this);
  }

  selectUX(e) {
    e.preventDefault();
    let $target = $(e.target);

    if ($target.hasClass('active')) {
      return
    }

    $target.addClass('active');
    $target.siblings().removeClass('active');

    this.setState({ selectedUX: $target.text() })
    console.log($target.text());
  }

  submit(e) {
    e.preventDefault();

    const { handleFeedback, game, currentUser } = this.props;

    const good = this.refs.good.value;
    const better = this.refs.better.value;
    const best = this.refs.best.value;

    if (good.length === 0 || better.length === 0 || best.length === 0) {
      toastr.error('All fields must be filled');
    }

    let feedback = {
      good,
      better,
      best,
      overallUX: this.state.selectedUX,
      gameId: game._id,
      sender: currentUser._id
    }

    handleFeedback(feedback);
  }

  closeModal(e) {
    e.preventDefault();

    swal({
      title: "Are you sure?",
      text: "You will not receive any points for testing if you don't give any feedback.",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, I don't want to help",
      closeOnConfirm: true
    },
    function(){
      $('#feedbackForm').modal('hide');
    });
  }

  render() {
    const { game } = this.props;
    return (
      <div className="modal fade" id="feedbackForm" role="dialog">
        <div className="modal-dialog ff">
          <div className="modal-content">
            <div className="modal-header">
              <h4>Make <span className="ff-gname">{game.name}</span> better!</h4>
              <a href="#" className="close-btn" onClick={this.closeModal}><i className="fa fa-times"></i></a>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="ff-input-group">
                  <p className="login-tag ff">What did you like about this game?</p>
                  <textarea className="ff-textarea" type="text" ref="good" />
                </div>
                <div className="ff-input-group">
                  <p className="login-tag ff">What would you improve?</p>
                  <textarea className="ff-textarea" type="text" ref="better" />
                </div>
                <div className="ff-input-group">
                  <p className="login-tag ff">What was your favorite thing about this game?</p>
                  <textarea className="ff-textarea" type="text" ref="best" />
                </div>
                <div className="ux-picker">
                  <p className="login-tag ff">Rate your overall experience</p>
                  <br></br>
                  <a href="#" className="ux ux-good active" onClick={this.selectUX}>Awesome game</a>
                  <a href="#" className="ux ux-medium" onClick={this.selectUX}>Minor issues, good overall</a>
                  <a href="#" className="ux ux-issues" onClick={this.selectUX}>Had a lot of issues</a>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <a href="#" className="btn play-btn" onClick={this.submit}>Submit</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}