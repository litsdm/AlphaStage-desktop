import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import GameShow from '../components/GameShow';

import { fetchGameIfNeeded } from '../actions/game';
import { getGame } from '../reducers/game';

const spawn = require('child_process').spawn;

class GamePage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch, params } = this.props
    dispatch(fetchGameIfNeeded(params.id))
  };

  handleOpenGameProcess(localPath) {
    const gameProcess = spawn('open', [localPath]);

    gameProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    gameProcess.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    gameProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  }

  render() {
    const { game, isFetching } = this.props;
    return (
      <div>
        {isFetching && !game &&
          <h2>Loading...</h2>
        }
        {!isFetching && !game &&
          <h2>Empty.</h2>
        }
        {game &&
          <GameShow game={this.props.game} openGame={this.handleOpenGameProcess} />
        }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    game: getGame(state, props.params.id)
  };
}

export default connect(mapStateToProps)(GamePage)
