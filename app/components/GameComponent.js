import React, { Component } from 'react';
import { Link } from 'react-router';

export default class GameComponent extends Component {
  const { game } = this.props;
  render() {
    return (
      <div className="game-component col-md-6 col-lg-4">
        <Link to={`/games/${game._id}`}>
          <div className="card">
            <div className="card-image">
              <img src={game.img} alt={game.name} />
            </div>
            <div className="card-content">
              <span className="card-title">{game.name}</span>
              <p>
                {game.description}
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
