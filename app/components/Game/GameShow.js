import React, { Component } from 'react';
import _ from 'underscore';
import jwtDecode from 'jwt-decode';
import $ from 'jquery';

import Gallery from '../Gallery';
import DeveloperNotesList from '../DeveloperNotes/DeveloperNotesList';

export default class GameShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isInstalled: localStorage.getItem(props.game._id) ? true : false
    }

    this.handlePlay = this.handlePlay.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.handleInvite = this.handleInvite.bind(this);
  }

  handleDownload(event) {
    event.preventDefault();
    const { game, downloadGame } = this.props;

    let name = game.name.replace(/\s+/g, '');

    let url = game.winBuildURL
    let filename = game.winFilename
    let winExe = game.winExe
    if (process.platform === 'darwin') {
      url = game.macBuildURL
      filename = game.macFilename
      winExe = null
    }

    let args = {
      id: game._id,
      filename,
      url,
      name,
      img: game.img,
      fullname: game.name,
      winExe
    }

    downloadGame(args);
  }

  handlePlay(event) {
    event.preventDefault();
    const { game, openGame } = this.props;

    let localGamePath = localStorage.getItem(game._id)

    openGame(localGamePath);
  }

  handleInvite(event) {
    event.preventDefault();

    const { displayInvite } = this.props;

    displayInvite();
  }

  componentDidMount() {
    $('.show-header').css('background', "linear-gradient(transparent, rgba(17, 17, 17, 0.7)), url(" + this.props.game.backgroundImg + ") no-repeat center");
    $('.show-header').css('background-size', "100% 100%");
  }

  render() {
    const { game, isDownloading } = this.props
    const { isInstalled } = this.state

    let token = localStorage.getItem('id_token');
    let currentUser = jwtDecode(token);

    let hasPlatform = false
    if (process.platform === 'darwin' && game.availableOn.macOS) {
      hasPlatform = true
    }
    else if (process.platform === 'win32' && game.availableOn.windows) {
      hasPlatform = true
    }

    let isAllowed = true;
    if (game.isPrivate) {
      isAllowed = _.contains(game.allowedPlayers, currentUser._id)
    }

    const isDeveloper = (game.developer === currentUser._id);

    return (
      <div className="game-show">
        <div className="show-header">
          <span className="sh-content">
            <h3 className="sh-title">{game.name}</h3>
            {!isAllowed &&
              <a href="#" className="btn play-btn disable"><i className="fa fa-lock"></i> {game.name} is in private testing</a>
            }
            {isInstalled && isAllowed &&
              <a href="#" className="btn play-btn" onClick={this.handlePlay}>Play <i className="fa fa-gamepad"></i></a>
            }
            {!isDownloading && !isInstalled && isAllowed && hasPlatform &&
              <a href="#" className="btn play-btn" onClick={this.handleDownload}>Download <i className="fa fa-cloud-download"></i></a>
            }
            {isDownloading && !isInstalled && isAllowed &&
              <a href="#" className='btn play-btn disable'>Download in progress <i className="fa fa-spinner fa-pulse fa-fw"></i></a>
            }

            {isDeveloper && game.isPrivate &&
              <a href="#" className="btn follow-btn" onClick={this.handleInvite}>Invite players</a>
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

  componentDidUpdate(prevProps) {
    const prevIsInstalled = prevProps.isInstalled
    const { isInstalled, game } = this.props

    if (isInstalled !== prevIsInstalled) {
      this.setState({ isInstalled: localStorage.getItem(game._id) ? true : false })
    }
  }
}
