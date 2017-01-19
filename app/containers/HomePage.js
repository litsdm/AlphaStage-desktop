// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Home from '../components/Home';

import { fetchGameplaysIfNeeded } from '../actions/gameplay';

class HomePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchGameplaysIfNeeded())
  }

  render() {
    const { gameplays, isFetching } = this.props;
    return (
      <div className="browse-page">
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
