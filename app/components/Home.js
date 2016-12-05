// @flow
import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import styles from './Home.css';

import GameComponent from './GameComponent';

let mediaRecorder;

class Home extends Component {
  render() {
    return (
      <div>
        <div className={styles.container}>
          <h2> Home</h2>
          {this.props.games.map((game, i) =>
            <div>
              <GameComponent game={game} />
            </div>
          )}
        </div>
      </div>
    );
  }
}


export default Home
