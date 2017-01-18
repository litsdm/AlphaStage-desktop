// @flow
import React, { Component } from 'react';
import GameplayListItem from './GameplayListItem';

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <ul className="gameplays">
          <li><GameplayListItem /></li>
          <li><GameplayListItem /></li>
          <li><GameplayListItem /></li>
          <li><GameplayListItem /></li>
        </ul>
      </div>
    )
  }
}
