// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import styles from './Home.css';

import GameList from './GameList';

let mediaRecorder;

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
          <h2> Home</h2>
          <GameList games={this.props.games} />
        </div>
      </div>
    );
  }
}
