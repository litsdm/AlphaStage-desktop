import React, { Component } from 'react';
import { Link } from 'react-router';

export default class GameComponent extends Component {
  render() {
    var game = {
      name: "Hyper Light Drifter",
      description: "Explore a beautiful, vast and ruined world riddled with dangers and lost technologies.",
      img: "http://cdn.wegotthiscovered.com/wp-content/uploads/Hyper-Light-Drifter-featured.png",
    };
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
