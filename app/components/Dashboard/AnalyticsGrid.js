import React, { Component } from 'react';

export default class AnalyticsGrid extends Component {
  render() {
    return (
      <div className="analytics-grid">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="analytics-card">
                <div className="ac-header">
                  <span className="ev-title">Sessions</span>
                </div>
                <div className="ac-content">
                  <span className="ev-value">1337</span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="analytics-card">
                <div className="ac-header">
                  <span className="ev-title">Total Players</span>
                </div>
                <div className="ac-content">
                  <span className="ev-value">57475</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
