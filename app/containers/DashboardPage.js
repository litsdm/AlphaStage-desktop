// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';

import Dashboard from '../components/Dashboard/Dashboard';

import { fetchDevGamesIfNeeded } from '../actions/devGame';
import { markFeedbackRequest } from '../actions/feedback';

class DashboardPage extends Component {
  constructor(props) {
    super(props);

    this.markFeedback = this.markFeedback.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props

    let token = localStorage.getItem('id_token');
    let currentUser = jwtDecode(token);

    dispatch(fetchDevGamesIfNeeded(currentUser._id))
  }

  markFeedback(feedback, mark, childIndex, parentIndex) {
    const { dispatch } = this.props;

    dispatch(markFeedbackRequest(feedback._id, mark, childIndex, parentIndex))
  }

  render() {
    const { games, feedback, isFetching, dispatch } = this.props;

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
          <Dashboard games={games} feedback={feedback} currentUser={currentUser} markFeedback={this.markFeedback}/>
        }
      </div>
    );
  }
}

DashboardPage.propTypes = {
  games: PropTypes.array.isRequired,
  feedback: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
  return {
    games: state.devGame.items,
    feedback: state.feedback.items,
    isFetching: state.devGame.isFetching,
  }
}

export default connect(mapStateToProps)(DashboardPage)
