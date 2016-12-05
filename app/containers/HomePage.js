// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchGamesIfNeeded } from '../actions/game';

import Home from '../components/Home';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchGamesIfNeeded())
  }

  render() {
    const { games, isFetching } = this.props;
    return (
      <div>
        {isFetching && games.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && games.length === 0 &&
          <h2>Empty.</h2>
        }
        {games.length > 0 &&
          <Home games={games} />
        }
      </div>
    );
  }
}

HomePage.propTypes = {
  games: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    games: state.game.items,
    isFetching: state.game.isFetching,
  }
}

export default connect(mapStateToProps)(HomePage)
