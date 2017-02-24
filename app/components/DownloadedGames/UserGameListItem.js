import React, { Component } from 'react';
import { Link } from 'react-router';

export default class UserGameListItem extends Component {
  render() {
    const { game } = this.props;

    console.log(game);
    
    let gameRoute = "/games/" + game._id;

    return (
      <Link to={gameRoute} className="ug-item col-md-4">
        <img className="ug-img" src={game.img} alt={game.name + " image in downloaded game list"}/>
        <p className="ug-name">{game.name}</p>
      </Link>
    )
  }
}
