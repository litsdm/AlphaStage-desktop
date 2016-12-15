// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { fetchGamesIfNeeded } from '../actions/game';

import Browse from '../components/Browse';

class BrowsePage extends Component {
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
      <div className="browse-page">
        {isFetching && games.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && games.length === 0 &&
          <h2>Empty.</h2>
        }
        {games.length > 0 &&
          <Browse games={games} />
        }
      </div>
    );
  }
}

BrowsePage.propTypes = {
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

export default connect(mapStateToProps)(BrowsePage)
