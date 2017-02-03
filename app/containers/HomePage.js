// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Home from '../components/Home';

import { fetchGameplaysIfNeeded, downloadFileRequest } from '../actions/gameplay';

var $refreshButton = $('#refresh');
var $results = $('#css_result');

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchGameplaysIfNeeded())
  }

  render() {
    const { gameplays, isFetching, dispatch } = this.props;

    return (
      <div className="home-page">
        {isFetching && gameplays.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && gameplays.length === 0 &&
          <h2>Empty.</h2>
        }
        {gameplays.length > 0 &&
          <Home gameplays={gameplays} />
        }
      </div>
    );
  }
}

HomePage.propTypes = {
  gameplays: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    gameplays: state.gameplay.items,
    isFetching: state.gameplay.isFetching,
  }
}

export default connect(mapStateToProps)(HomePage)
