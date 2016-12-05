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
          <div>
            <GameComponent />
          </div>
        </div>
      </div>
    );
  }
}


export default Home
