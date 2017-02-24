import React, { Component } from 'react';
import $ from 'jquery';

import Gallery from '../Gallery';
import DeveloperNotesList from '../DeveloperNotes/DeveloperNotesList';

export default class GameShow extends Component {
  constructor(props) {
    super(props);

    this.handlePlay = this.handlePlay.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  handleDownload(event) {
    event.preventDefault();
    const { game, downloadGame } = this.props;

    let name = game.name.replace(/\s+/g, '');

    let args = {
      id: game._id,
      url: game.cloudfrontURL,
      filename: game.filename,
      name
    }

    downloadGame(args);
  }

  handlePlay(event) {
    event.preventDefault();
    const { game, openGame } = this.props;

    let localGamePath = localStorage.getItem(game._id)

    openGame(localGamePath);
  }

  componentDidMount() {
    $('.show-header').css('background', "linear-gradient(transparent, rgba(17, 17, 17, 0.7)), url(" + this.props.game.backgroundImg + ") no-repeat center");
    $('.show-header').css('background-size', "100% 100%");
  }

  render() {
    const { game, isDownloading, isInstalled } = this.props

    return (
      <div className="game-show">
        <div className="show-header">
          <span className="sh-content">
            <h3 className="sh-title">{game.name}</h3>
            {isInstalled &&
              <a href="#" className="btn play-btn" onClick={this.handlePlay}>Play <i className="fa fa-gamepad"></i></a>
            }
            {!isDownloading && !isInstalled &&
              <a href="#" className="btn play-btn" onClick={this.handleDownload}>Download <i className="fa fa-cloud-download"></i></a>
            }
            {isDownloading && !isInstalled &&
              <a href="#" className='btn play-btn downloading'>Download in progress <i className="fa fa-cloud-download"></i></a>
            }
            <span><i className="fa fa-users"></i> {game.playCount}</span>
            {/*
            <a href="#" className="btn follow-btn">Follow</a>
            <a href="#" className="star-btn"><i className="fa fa-star-o"></i></a>
            */}
          </span>
        </div>
        <div className="container gs-content">
          <div className="row">
            <div className="col-md-8 left-bar">
              <Gallery images={game.galleryLinks} videos={game.videoLinks} />
              {/*<DeveloperNotesList />}*/}
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
