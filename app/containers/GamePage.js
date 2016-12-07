import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import GameListItem from '../components/GameListItem';

import { fetchGameIfNeeded } from '../actions/game';
import { getGame } from '../reducers/game';

class GamePage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch, params } = this.props
    dispatch(fetchGameIfNeeded(params.id))
  };

  render() {
    const { game, isFetching } = this.props;
    return (
      <div>
        {isFetching && !game &&
          <h2>Loading...</h2>
        }
        {!isFetching && !game &&
          <h2>Empty.</h2>
        }
        {game &&
          <GameListItem game={this.props.game} />
        }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    game: getGame(state, props.params.id)
  };
}

export default connect(mapStateToProps)(GamePage)
