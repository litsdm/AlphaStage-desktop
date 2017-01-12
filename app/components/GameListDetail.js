import React, { Component } from 'react';

export default class GameListDetail extends Component {
  render() {
    const { game } = this.props;

    let images = null;
    if (game.galleryLinks) {
      images = game.galleryLinks.map((link) => {
        return <img className="details-img" src={link} alt="gallery img" />
      });
    }
    console.log(images);
    return (
      <div>
        <h3>{game.name}</h3>
        <p>
          {game.description}
        </p>
        {images}
      </div>
    )
  }
}
