// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Home from '../components/Home';

import { fetchGameplaysIfNeeded, downloadFileRequest } from '../actions/gameplay';

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
    if (gameplays.lengt > 0) {
      dispatch(downloadFileRequest(gameplays[0].key));
    }
    return (
      <div className="home-page">
        {isFetching && gameplays.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && gameplays.length === 0 &&
          <h2>Empty.</h2>
        }
        {gameplays.length > 0 &&
          <div>
            <Home gameplays={gameplays} />
            <video width="320" height="240" controls>
              <source src={'/tmp/' + gameplays[0].key} type="video/webm"></source>
              Your browser does not support the video tag.
            </video>
          </div>
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
