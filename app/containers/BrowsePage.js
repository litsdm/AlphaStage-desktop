// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

// Import types
import type { Game } from '../utils/globalTypes';

// import actions
import { fetchGamesIfNeeded } from '../actions/game';

// import components
import Browse from '../components/Browse/Browse';
import BrowseHeader from '../components/Browse/BrowseHeader';
import Empty from '../components/Empty';


/**
 * BrowsePage container
 * Displays all games on the Library and should filter them but right now
 * it only shows all the games.
 */
class BrowsePage extends Component {
  props: {
    isFetching: boolean,
    games: Game[],
    dispatch: () => void
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchGamesIfNeeded());
  }

  render() {
    const { games, isFetching } = this.props;

    // Get current user by decoding jwt token
    const token = localStorage.getItem('id_token');
    const currentUser = jwtDecode(token);
    const { isDeveloper } = currentUser;

    // Create props for empty component
    const emptyTitle = 'Welcome to Alpha Stage!';
    const emptyDesc = (
      <p>
        You must be one of the first testers of Alpha Stage, thank you for signing up.
        {isDeveloper &&
          <span> Be the first person to <Link to="/games/new"> submit a game</Link> and discover the full functionality of Alpha Stage!</span>
        }
        {!isDeveloper &&
          <span>
            A selected group of developers will be uploading their games soon, stay tuned!
          </span>
        }
      </p>
    );

    return (
      <div className="browse-page">
        <BrowseHeader />
        {isFetching && games.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && games.length === 0 &&
          <Empty title={emptyTitle} description={emptyDesc} />
        }
        {games.length > 0 &&
          <Browse games={games} />
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    games: state.game.items,
    isFetching: state.game.isFetching,
  };
}

export default connect(mapStateToProps)(BrowsePage);
