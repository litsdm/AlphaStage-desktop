import React, { Component } from 'react';
import Chart from 'chart.js';

export default class AnalyticsGrid extends Component {
  componentDidMount() {
    let data = {
      labels: ["Page Views", "Downloads", "Unique Sessions", "Uninstalls"],
      datasets: [
        {
          label: "Players",
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          borderWidth: 1,
          data: [2000, 1000, 300, 30],
        }
      ]
    };

    let ctx = document.getElementById("myChart");
    let myBarChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        onClick: this.chartClick,
        legend: {
            display: false
        }
      }
    });
  }

  chartClick(e, arr) {
    if (arr.length == 0) {
      return
    }

    console.log(arr[0]._index);
  }

  render() {
    return (
      <div className="analytics-grid">
        <div className="container">
          <h2>Analytics</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="analytics-card">
                <div className="ac-header">
                  <span className="ev-title">Sessions</span>
                </div>
                <div className="ac-content">
                  <span className="ev-value">1337</span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="analytics-card">
                <div className="ac-header">
                  <span className="ev-title">Total Players</span>
                </div>
                <div className="ac-content">
                  <span className="ev-value">57475</span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="analytics-card">
                <div className="ac-header">
                  <span className="ev-title">Total Impressions</span>
                </div>
                <div className="ac-content">
                  <span className="ev-value">13372</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="analytics-card graph">
                <div className="ac-header">
                  <span className="ev-title">Churn</span>
                </div>
                <div className="ac-content">
                  <canvas id="myChart" width="400" height="400"></canvas>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6">
                  <div className="analytics-card">
                    <div className="ac-header">
                      <span className="ev-title">Total Impressions</span>
                    </div>
                    <div className="ac-content">
                      <span className="ev-value">13372</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
