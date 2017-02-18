// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';

import Dashboard from '../components/Dashboard/Dashboard';

import { fetchDevGamesIfNeeded } from '../actions/devGame';

class DashboardPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props

    let token = localStorage.getItem('id_token');
    let currentUser = jwtDecode(token);

    dispatch(fetchDevGamesIfNeeded(currentUser._id))
  }

  render() {
    const { games, isFetching, dispatch } = this.props;

    let token = localStorage.getItem('id_token');
    let currentUser = jwtDecode(token);

    return (
      <div className="home-page">
        {isFetching && games.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && games.length === 0 &&
          <h2>Empty.</h2>
        }
        {games.length > 0 &&
          <Dashboard games={games} currentUser={currentUser} />
        }
      </div>
    );
  }
}

DashboardPage.propTypes = {
  games: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    games: state.devGame.items,
    isFetching: state.devGame.isFetching,
  }
}

export default connect(mapStateToProps)(DashboardPage)
