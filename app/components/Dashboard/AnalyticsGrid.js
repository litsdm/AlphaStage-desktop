/* eslint-disable import/extensions */
// @flow
import React, { Component } from 'react';
import Chart from 'chart.js';

import type { DevGame } from '../../utils/globalTypes';

type Props = {
  game: DevGame
};

let churnBarChart;

export default class AnalyticsGrid extends Component {

  createBarChart: () => void;

  static chartClick(e: SyntheticMouseEvent, arr: Array<Object>) {
    if (arr.length === 0) {
      return;
    }

    // eslint-disable-next-line no-underscore-dangle
    const index = arr[0]._index;
    console.log(index);
    // Display users that stayed in x stage
  }

  constructor(props: Props) {
    super(props);

    this.createBarChart = this.createBarChart.bind(this);
  }

  componentDidMount() {
    this.createBarChart();
  }

  componentWillUpdate() {
    if (churnBarChart) {
      churnBarChart.destroy();
    }
  }

  componentDidUpdate() {
    this.createBarChart();
  }

  createBarChart() {
    const { game } = this.props;
    const { pageViewUsers, downloadUsers, playingUsers, uninstallUsers } = game.analytics;
    const barData = [
      pageViewUsers.length,
      downloadUsers.length,
      playingUsers.length,
      uninstallUsers.length
    ];

    const data = {
      labels: ['Page Views', 'Downloads', 'Unique Sessions', 'Uninstalls'],
      datasets: [
        {
          label: 'Players',
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
          data: barData,
        }
      ]
    };

    const ctx = document.getElementById('myChart');
    churnBarChart = new Chart(ctx, {
      type: 'bar',
      data,
      options: {
        scales: {
          color: '#ccc',
          xAxes: [{
            gridLines: {
              color: '#777',
              drawBorder: true,
              drawOnChartArea: false
            },
            ticks: {
              fontColor: '#ccc', // this here
            },
          }],
          yAxes: [{
            gridLines: {
              color: '#777',
              drawBorder: true,
              drawOnChartArea: false
            },
            ticks: {
              fontColor: '#ccc', // this here
              min: 0
            },
          }],
        },
        onClick: AnalyticsGrid.chartClick,
        legend: {
          display: false
        }
      }
    });
  }

  render() {
    const { game } = this.props;
    const { downloads, pageViews, sessions, players } = game.analytics;
    return (
      <div className="analytics-grid">
        <div className="container">
          <h2>Analytics</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="analytics-card graph">
                <div className="ac-header">
                  <span className="ev-title">Churn</span>
                </div>
                <div className="ac-content">
                  <canvas id="myChart" width="400" height="400" />
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="row">
                <div className="col-md-6">
                  <div className="analytics-card">
                    <div className="ac-header">
                      <span className="ev-title">Page Views</span>
                    </div>
                    <div className="ac-content">
                      <span className="ev-value">{pageViews}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="analytics-card">
                    <div className="ac-header">
                      <span className="ev-title">Total Players</span>
                    </div>
                    <div className="ac-content">
                      <span className="ev-value">{players}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="analytics-card">
                    <div className="ac-header">
                      <span className="ev-title">Sessions</span>
                    </div>
                    <div className="ac-content">
                      <span className="ev-value">{sessions}</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="analytics-card">
                    <div className="ac-header">
                      <span className="ev-title">Total Downloads</span>
                    </div>
                    <div className="ac-content">
                      <span className="ev-value">{downloads}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
