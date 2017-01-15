import React, { Component } from 'react';
import $ from 'jquery';

import Gallery from './Gallery';
import DeveloperNotesList from './DeveloperNotesList';

export default class GameShow extends Component {
  constructor(props) {
    super(props);

    this.handlePlay = this.handlePlay.bind(this);
  }

  handlePlay(event) {
    event.preventDefault();

    let minecraft = '/Applications/Minecraft.app';
    let titanSouls = '/Users/carlosdiez/Library/Application\ Support/Steam/steamapps/common/Titan\ Souls/Titan\ Souls.app';

    this.props.openGame(titanSouls);
  }

  componentDidMount() {
    $('.show-header').css('background', "linear-gradient(transparent, rgba(17, 17, 17, 0.7)), url(" + this.props.game.backgroundImg + ") no-repeat center");
    $('.show-header').css('background-size', "100% 100%");
  }

  render() {
    const { game } = this.props
    return (
      <div className="game-show">
        <div className="show-header">
          <span className="sh-content">
            <h3 className="sh-title">{game.name}</h3>
            <a href="#" className="btn play-btn" onClick={this.handlePlay}>Play <i className="fa fa-gamepad"></i></a>
            <a href="#" className="btn follow-btn">Follow</a>
            <a href="#" className="star-btn"><i className="fa fa-star-o"></i></a>
          </span>
        </div>
        <div className="container gs-content">
          <div className="row">
            <div className="col-md-8 left-bar">
              <Gallery images={game.galleryLinks} videos={game.videoLinks} />
              <DeveloperNotesList />
            </div>
            <div className="col-md-4 right-bar">
              <div className="br-card">
                <img className="img-detail" src={game.img}/>
                <p className="show-description">{game.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
