// @flow
import React, { Component } from 'react';
import _ from 'underscore';
import jwtDecode from 'jwt-decode';
import $ from 'jquery';

import type { Game, DownloadArgs } from '../../utils/globalTypes';

import Gallery from '../Gallery';
// import DeveloperNotesList from '../DeveloperNotes/DeveloperNotesList';

type Props = {
  game: Game,
  isDownloading: boolean,
  isInstalled: boolean,
  downloadGame: (args: DownloadArgs) => void,
  openGame: (path: string) => void,
  displayInvite: () => void,
  uninstall: (game: Game) => void
};

export default class GameShow extends Component {

  handlePlay: (e: Event) => void;
  handleDownload: (e: Event) => void;
  handleInvite: (e: Event) => void;
  handleUninstall: (e: Event) => void;

  static showDropdown(e: Event) {
    e.preventDefault();

    const myDropdown = document.getElementById('gameDropdown');
    if (myDropdown) {
      myDropdown.classList.toggle('show');
    }
  }

  constructor(props: Props) {
    super(props);

    this.handlePlay = this.handlePlay.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.handleInvite = this.handleInvite.bind(this);
    this.handleUninstall = this.handleUninstall.bind(this);
  }

  componentDidMount() {
    $('.show-header').css('background', `linear-gradient(transparent, rgba(17, 17, 17, 0.7)), url(${this.props.game.backgroundImg}) no-repeat center`);
    $('.show-header').css('background-size', '100% 100%');
  }

  handleDownload(e: Event) {
    e.preventDefault();
    const { game, downloadGame } = this.props;

    const name = game.name.replace(/\s+/g, '');

    let url;
    let filename;
    let winExe;

    if (process.platform === 'darwin') {
      url = game.macBuildURL;
      filename = game.macFilename;
      winExe = null;
    } else {
      url = game.winBuildURL;
      filename = game.winFilename;
      winExe = game.winExe;
    }

    const args = {
      id: game._id,
      filename,
      url,
      name,
      img: game.img,
      fullname: game.name,
      winExe
    };

    downloadGame(args);
  }

  handlePlay(e: Event) {
    e.preventDefault();
    const { game, openGame } = this.props;

    const localGamePath = localStorage.getItem(game._id);

    openGame(localGamePath);
  }

  handleInvite(e: Event) {
    e.preventDefault();

    const { displayInvite } = this.props;

    displayInvite();
  }

  handleUninstall(e: Event) {
    e.preventDefault();

    const { game, uninstall } = this.props;

    uninstall(game);
  }

  render() {
    const { game, isDownloading, isInstalled } = this.props;

    const token = localStorage.getItem('id_token');
    const currentUser = jwtDecode(token);

    let hasPlatform = false;
    if (process.platform === 'darwin' && game.availableOn.macOS) {
      hasPlatform = true;
    } else if (process.platform === 'win32' && game.availableOn.windows) {
      hasPlatform = true;
    }

    let isAllowed = true;
    if (game.isPrivate) {
      isAllowed = _.contains(game.allowedPlayers, currentUser._id);
    }

    const isDeveloper = (game.developer === currentUser._id);

    return (
      <div className="game-show">
        <div className="show-header">
          <span className="sh-content">
            <h3 className="sh-title">{game.name}</h3>
            {!isAllowed &&
              <a href="#playDis" className="btn play-btn disable">
                <i className="fa fa-lock" /> {game.name} is in private testing
              </a>
            }
            {isInstalled && isAllowed &&
              <span>
                <a href="#play" className="btn play-btn" onClick={this.handlePlay}>
                  Play <i className="fa fa-gamepad" />
                </a>
                <a href="#uninstall" className="btn uninstall-btn" onClick={this.handleUninstall}>Uninstall</a>
              </span>
            }
            {!isDownloading && !isInstalled && isAllowed && hasPlatform &&
              <a href="#download" className="btn play-btn" onClick={this.handleDownload}>
                Download <i className="fa fa-cloud-download" />
              </a>
            }
            {isDownloading && !isInstalled && isAllowed && hasPlatform &&
              <a href="#progress" className="btn play-btn disable">
                Download in progress <i className="fa fa-spinner fa-pulse fa-fw" />
              </a>
            }
            {!isDownloading && !isInstalled && isAllowed && !hasPlatform &&
              <a href="#dis" className="btn play-btn disable">{game.name} is not available on your OS</a>
            }
            {isDeveloper && game.isPrivate &&
              <a href="#invite" className="btn follow-btn" onClick={this.handleInvite}>Invite players</a>
            }
          </span>
        </div>
        <div className="container gs-content">
          <div className="row">
            <div className="col-md-8 left-bar">
              <Gallery images={game.galleryLinks} videos={game.videoLinks} />
              {/* <DeveloperNotesList />}*/}
            </div>
            <div className="col-md-4 right-bar">
              <div className="br-card">
                <img className="img-detail" src={game.img} alt="" />
                <p className="show-description">{game.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
