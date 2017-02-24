import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';

import DownloadedGames from '../components/DownloadedGames/DownloadedGames';

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
    return (
      <div className="your-games-page">
        {isFetching && games.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && games.length === 0 &&
          <h2>Empty.</h2>
        }
        {games.length > 0 &&
          <DownloadedGames />
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
