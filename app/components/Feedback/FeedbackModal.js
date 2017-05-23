import React, { Component } from 'react';
import $ from 'jquery';
import timeago from '../../utils/timeago';

import VideoPlayer from '../VideoPlayer';

export default class FeedbackModal extends Component {
  closeModal(e) {
    e.preventDefault();
    $('#myModal').modal('hide');
  }

  render() {
    const { feedback } = this.props;

    let dateStr = $.timeago(feedback.createdAt)
    dateStr = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);

    return (
      <div className="modal fade" id="myModal" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="fmodal-header">
              <a href="#" className="close-btn fm" onClick={this.closeModal}><i className="fa fa-times"></i></a>
              <h4>Feedback by {feedback.sender ? feedback.sender.username : "User"}</h4>
              <h6>{dateStr}</h6>
            </div>
            <div className="modal-body">
              <VideoPlayer id="feedback-video" src={feedback.gameplay.cloudfrontURL}/>
              <div className="modal-messages">
                <h4>Good <span className="modal-desc"> - What the tester liked</span></h4>
                <p>
                  {feedback.good}
                </p>
                <h4>Better <span className="modal-desc"> - What the tester thought could be better</span></h4>
                <p>
                  {feedback.better}
                </p>
                <h4>Best <span className="modal-desc"> - What the tester loved</span></h4>
                <p>
                  {feedback.best}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
