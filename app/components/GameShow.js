import React, { Component } from 'react';
import $ from 'jquery';

import Gallery from './Gallery';

export default class GameShow extends Component {
  componentDidMount() { //
    $('.show-header').css('background', "linear-gradient(transparent, rgba(17, 17, 17, 0.5)), url(" + this.props.game.backgroundImg + ") no-repeat center");
    $('.show-header').css('background-size', "100% 100%");
  }

  render() {
    const { game } = this.props
    return (
      <div className="game-show">
        <div className="show-header">
          <span className="sh-content">
            <h3>{game.name}</h3>
            <a href="#" className="btn play-btn">Play</a>
            <a href="#" className="btn follow-btn">Follow</a>
            <a href="#" className="star-btn"><i className="fa fa-star-o"></i></a>
          </span>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 details-card">
              <Gallery images={game.galleryLinks} videos={game.videoLinks} />
            </div>
            <div className="col-md-4 br-card">
              <img className="img-detail" src={game.img}/>
              <p className="show-description">{game.description}</p>
            </div>
          </div>

        </div>
      </div>
    )
  }
}
