// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

// import types
import type { Game } from '../utils/globalTypes';
import type { Dispatch } from '../actions/types';

// import actions
import { fetchUserGamesIfNeeded } from '../actions/userGame';

// import components
import DownloadedGames from '../components/DownloadedGames/DownloadedGames';
import Empty from '../components/Empty';


/**
 * YourGamesPage container
 * It is the user's library of games, all downloaded games appear here
 */
class YourGamesPage extends Component {
  props: {
    games: Game[],
    isFetching: boolean,
    dispatch: Dispatch
  }
  componentWillMount() {
    const { dispatch } = this.props;

    const token = localStorage.getItem('id_token');
    const currentUser = jwtDecode(token);

    // Get user's games
    dispatch(fetchUserGamesIfNeeded(currentUser._id));
  }

  render() {
    const { isFetching, games } = this.props;

    // Declare empty information
    const emptyTitle = 'Your library is empty';
    const emptyDesc = (
      <p>
        To add games to your library just download any game you like from the
        <Link to="/"> Browse page</Link>.
      </p>
    );

    return (
      <div className="your-games-page">
        {isFetching && games.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && games.length === 0 &&
          <Empty title={emptyTitle} description={emptyDesc} />
        }
        {games.length > 0 &&
          <DownloadedGames games={games} />
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    games: state.userGame.items,
    isFetching: state.userGame.isFetching,
  };
}

export default connect(mapStateToProps)(YourGamesPage);
