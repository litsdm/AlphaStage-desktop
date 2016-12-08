import React, { Component } from 'react';

export default class GameListDetail extends Component {
  render() {
    const { game } = this.props;
    return (
      <div >
        <h3>{game.name}</h3>
      </div>
    )
  }
}
