// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import jwtDecode from 'jwt-decode';

// Import components
import Dashboard from '../components/Dashboard/Dashboard';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import Empty from '../components/Empty';

// Import actions
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

    // Get current user by decoding jwt token
    let token = localStorage.getItem('id_token');
    let currentUser = jwtDecode(token);

    // Create props for empty component
    const emptyTitle = "No games yet"
    const emptyDesc = (
      <p>
        You have yet to add any games to Alpha Stage.
        <Link to="/games/new"> Add a game</Link> and start getting feedback now!
      </p>
    )

    return (
      <div className="home-page">
        <DashboardHeader currentUser={currentUser}/>
        {isFetching && games.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && games.length === 0 &&
          <Empty title={emptyTitle} description={emptyDesc}/>
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
