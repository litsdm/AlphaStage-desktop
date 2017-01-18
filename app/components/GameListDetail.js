import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

export default class GameListDetail extends Component {
  render() {
    const { game } = this.props;

    let images = null;
    if (game.galleryLinks) {
      images = game.galleryLinks.map((link, index) => {
        return <img className="details-img" src={link} alt="gallery img" key={link}/>
      });
    }
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName = "example"
          transitionEnterTimeout={500}
          transitionLeave={false}>
        <h3 key={game._id}>{game.name}</h3>
        <p key={game.name}>
          {game.description}
        </p>
        {images}
        <div className="empty-space" key={"empty" + game._id}></div>
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}
