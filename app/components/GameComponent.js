import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

export default class GameComponent extends Component {
  componentDidMount() {
    const { game } = this.props;
    $(`#${game._id}`).hover(() => {
      $('.game-component').removeClass('active');

      $(`#${game._id}`).addClass('active');
    });
  };

  render() {
    const { game } = this.props;
    return (
      <Link to={`/games/${game._id}`}>
        <div id={game._id} className="game-component row">
          <span className="list-card">
            <span className="lc-image">
              <img src={game.img} alt={game.name} />
            </span>
            <span className="lc-content">
              <span className="lc-title">{game.name}</span>
            </span>
          </span>
        </div>
      </Link>
    );
  }
}
