import React, { Component } from 'react';
import { Link } from 'react-router';

export default class GameComponent extends Component {
  render() {
    return (
      <div className="game-component">
        <Link to="#">
          <div className="card">
            <div className="card-image">
              <img src={this.props.game.img} alt={this.props.game.name} />
            </div>
            <div className="card-content">
              <span className="card-title">{this.props.game.name}</span>
              <p>
                {this.props.game.description}
              </p>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
