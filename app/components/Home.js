// @flow
import React, { Component } from 'react';
import $ from 'jquery';

// Quick fix to use bootstrap js, there is probably a better way
import tether from 'tether';
window.Tether = tether;
window.jQuery = $
require('bootstrap');

import FeedbackList from './FeedbackList';
import FeedbackModal from './FeedbackModal';

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    $('.show-modal').click((e) => {
      e.preventDefault();
      $("#myModal").modal();
    });
  }

  render() {
    const { gameplays } = this.props

    return (
      <div className="container">
        <h1>Dashboard</h1>
        <div className="row">
          <div className="col-md-9">
            <FeedbackList gameplays={gameplays} />
          </div>
          <div className="col-md-3">
            <div className="user-games">
              <p className="ug-title">Your Games</p>
              <a href="#" className="ug-name active"><p>Titan Souls</p></a>
              <a href="#" className="ug-name"><p>Lethal League</p></a>
            </div>
          </div>
        </div>
        <FeedbackModal />
      </div>
    )
  }
}
