// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Home from '../components/Home';
import Dashboard from '../components/Dashboard/Dashboard';

import { fetchFeedbacksIfNeeded } from '../actions/feedback';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchFeedbacksIfNeeded())
  }

  render() {
    const { feedback, isFetching, dispatch } = this.props;
    return (
      <div className="home-page">
        {isFetching && feedback.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && feedback.length === 0 &&
          <h2>Empty.</h2>
        }
        {feedback.length > 0 &&
          <Dashboard feedback={feedback} />
        }
      </div>
    );
  }
}

HomePage.propTypes = {
  feedback: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    feedback: state.feedback.items,
    isFetching: state.feedback.isFetching,
  }
}

export default connect(mapStateToProps)(HomePage)
