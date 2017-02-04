// @flow
import React, { Component } from 'react';

import FeedbackList from './FeedbackList';

export default class Home extends Component {
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
      </div>
    )
  }
}
