import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import jwtDecode from 'jwt-decode';

import DownloadedGames from '../components/DownloadedGames/DownloadedGames';
import Empty from '../components/Empty';

import { fetchUserGamesIfNeeded } from '../actions/userGame';

class YourGamesPage extends Component {
  componentWillMount() {
    const { dispatch } = this.props;

    let token = localStorage.getItem('id_token');
    let currentUser = jwtDecode(token);

    dispatch(fetchUserGamesIfNeeded(currentUser._id));
  }

  render() {
    const { isFetching, games } = this.props;

    const emptyTitle = "Your library is empty"
    const emptyDesc = (
      <p>
        To add games to your library just download any game you like from the
        <Link to="/"> Browse page</Link>.
      </p>
    )

    return (
      <div className="your-games-page">
        {isFetching && games.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && games.length === 0 &&
          <Empty title={emptyTitle} description={emptyDesc}/>
        }
        {games.length > 0 &&
          <DownloadedGames games={games}/>
        }
      </div>
    )
  }
}

YourGamesPage.propTypes = {
  games: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    games: state.userGame.items,
    isFetching: state.userGame.isFetching,
  }
}

export default connect(mapStateToProps)(YourGamesPage)
