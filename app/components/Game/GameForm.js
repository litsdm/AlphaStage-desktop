// @flow
import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import $ from 'jquery';
import toastr from 'toastr';

import type { Game } from '../../utils/globalTypes';

type Props = {
  isUploading: boolean,
  isEditing: boolean,
  macURL: string,
  winURL: string,
  macName: string,
  winName: string,
  game: Game,
  changeRoute: (path: string) => void,
  getSignedRequest: (file: Object, isWin: boolean) => void,
  editGame: (game: Game, id: string) => void,
  addGame: (game: Object) => void
};

export default class GameForm extends Component {
  state: {
    windowsActive: boolean,
    macActive: boolean,
    isPrivate: boolean
  }

  // Non-static function assignments
  handleSubmit: (e: SyntheticEvent | SyntheticMouseEvent) => void;
  handleEdit: (e: SyntheticEvent | SyntheticMouseEvent) => void;
  handleBuildClick: (e: SyntheticMouseEvent) => void;
  handleBuildFileChange: (e: SyntheticMouseEvent) => void;
  togglePermission: (e: SyntheticMouseEvent) => void;
  createGame: () => Game;
  validateGame: () => boolean;

  // STATIC FUNCTIONS
  static showError(message: string) {
    toastr.error(message);
  }

  static formatVideoURL(video: string) {
    if (video.includes('embed')) {
      return video;
    } else if (video.includes('v=')) {
      const parts = video.split('v=');
      return `https://www.youtube.com/embed/${parts.pop()}`;
    }

    const parts = video.split('/');
    return `https://www.youtube.com/embed/${parts.pop()}`;
  }

  static editValues(game: Game) {
    const name = (document.getElementById('nName'): any);
    const description = (document.getElementById('nDescription'): any);
    const imgURL = (document.getElementById('nImgURL'): any);
    const backgroundImg = (document.getElementById('nBackgroundImg'): any);
    const videoLinks = (document.getElementById('nVideoLinks'): any);
    const galleryLinks = (document.getElementById('nGalleryLinks'): any);
    const winExe = (document.getElementById('nWinExe'): any);

    name.value = game.name;
    description.value = game.description;
    imgURL.value = game.img;
    backgroundImg.value = game.backgroundImg;
    videoLinks.value = game.videoLinks.join(' ');
    galleryLinks.value = game.galleryLinks.join(' ');
    winExe.value = game.winExe;
  }

  // CONSTRUCTOR
  constructor(props: Props) {
    super(props);

    this.state = {
      windowsActive: true,
      macActive: false,
      isPrivate: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleBuildClick = this.handleBuildClick.bind(this);
    this.handleBuildFileChange = this.handleBuildFileChange.bind(this);
    this.togglePermission = this.togglePermission.bind(this);
    this.createGame = this.createGame.bind(this);
    this.validateGame = this.validateGame.bind(this);
  }

  // COMPONENT_DID_MOUNT
  componentDidMount() {
    const { game } = this.props;

    if (game) {
      GameForm.editValues(game);
    }
  }

  handleBuildFileChange(e: SyntheticMouseEvent) {
    const { getSignedRequest } = this.props;

    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }

    const files = e.target.files;
    const file = files[0];

    if (file == null) {
      return;
    }

    const $target = $(e.target);
    const isWinBuild = ($target.attr('id') === 'windowsBuild');

    getSignedRequest(file, isWinBuild);
  }

  handleEdit(e: SyntheticEvent | SyntheticMouseEvent) {
    e.preventDefault();
    const { editGame, changeRoute, game } = this.props;

    if (!this.validateGame()) {
      return;
    }

    const editedGame = this.createGame();

    editGame(editedGame, game._id);
    changeRoute('/dashboard');
  }

  handleSubmit(e: SyntheticEvent | SyntheticMouseEvent) {
    e.preventDefault();
    const { addGame, changeRoute } = this.props;

    if (!this.validateGame()) {
      return;
    }

    const game = this.createGame();

    addGame(game);
    changeRoute('/dashboard');
  }

  createGame() {
    const { windowsActive, macActive, isPrivate } = this.state;
    const { macURL, winURL, macName, winName } = this.props;

    const name = (document.getElementById('nName'): any);
    const description = (document.getElementById('nDescription'): any);
    const imgURL = (document.getElementById('nImgURL'): any);
    const backgroundImg = (document.getElementById('nBackgroundImg'): any);
    const videoLinks = (document.getElementById('nVideoLinks'): any);
    const galleryLinks = (document.getElementById('nGalleryLinks'): any);
    const winExe = (document.getElementById('nWinExe'): any);

    const videos = videoLinks.value.match(/\S+/g);
    const images = galleryLinks.value.match(/\S+/g);

    const embeddedVideos = videos.map((video) => GameForm.formatVideoURL(video));

    const availableOn = {
      windows: windowsActive,
      macOS: macActive,
    };

    const token = localStorage.getItem('id_token');
    const currentUser = jwtDecode(token);

    const game = {
      name: name.value,
      description: description.value,
      img: imgURL.value,
      backgroundImg: backgroundImg.value,
      availableOn,
      videoLinks: embeddedVideos,
      galleryLinks: images,
      developer: currentUser._id,
      macBuildURL: macURL,
      winBuildURL: winURL,
      macFilename: macName,
      winFilename: winName,
      winExe: winExe.value,
      isPrivate,
    };

    return game;
  }

  validateGame() {
    const { windowsActive, macActive } = this.state;
    const { isEditing } = this.props;

    const nameElem = (document.getElementById('nName'): any);
    const descriptionRef = (document.getElementById('nDescription'): any);
    const imgURLRef = (document.getElementById('nImgURL'): any);
    const macBuildRef = (document.getElementById('appleBuild'): any);
    const windowsBuildRef = (document.getElementById('windowsBuild'): any);
    const galleryLinksRef = (document.getElementById('nGalleryLinks'): any);
    const winExeRef = (document.getElementById('nWinExe'): any);

    if (!nameElem.value) {
      nameElem.focus();
      GameForm.showError('Name field must not be empty.');
      return false;
    } else if (!descriptionRef.value) {
      descriptionRef.focus();
      GameForm.showError('Description field must not be empty.');
      return false;
    } else if (!imgURLRef.value) {
      imgURLRef.focus();
      GameForm.showError('Image field must not be empty.');
      return false;
    } else if (!windowsActive && !macActive) {
      GameForm.showError('You must select at least one OS.');
      return false;
    } else if (windowsActive && windowsBuildRef.files.length === 0 && !isEditing) {
      GameForm.showError('Please add a Windows build or deselect the OS.');
      return false;
    } else if (macActive && macBuildRef.files.length === 0 && !isEditing) {
      GameForm.showError('Please add a macOS build or deselect the OS.');
      return false;
    } else if (!galleryLinksRef.value) {
      GameForm.showError('Please add at least one image for the gallery. Remember to separate them with whitespaces!');
      return false;
    } else if (!winExeRef.value && windowsActive) {
      GameForm.showError('Please write the name of your windows .exe file.');
      return false;
    }

    return true;
  }

  handleBuildClick(e: SyntheticMouseEvent) {
    e.preventDefault();
    if (!(e.target instanceof HTMLElement)) {
      return;
    }

    const parentElement = e.target.parentElement;
    if (!parentElement) {
      return;
    }

    const $parent = $(parentElement);
    const elementId = parentElement.getAttribute('href');
    const $targetElement = $(elementId);

    switch (elementId) {
      case '#windowsBuild':
        this.setState({ windowsActive: !this.state.windowsActive });
        $('.win-exe').toggleClass('hidden');
        $('#win-br').toggleClass('hidden');
        break;
      case '#appleBuild':
        this.setState({ macActive: !this.state.macActive });
        $('#mac-br').toggleClass('hidden');
        break;
      default: break;
    }

    $targetElement.toggleClass('hidden');
    $parent.toggleClass('os-selected');
  }

  togglePermission(e: SyntheticMouseEvent) {
    e.preventDefault();

    this.setState({ isPrivate: !this.state.isPrivate });
  }

  // RENDER
  render() {
    const { isUploading, isEditing } = this.props;
    const { isPrivate } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="nName" className="input-tag">NAME</label>
          <input className="gf-input" type="text" id="nName" />
        </div>
        <div>
          <label htmlFor="nDescription" className="input-tag">SHORT DESCRIPTION</label>
          <textarea className="gf-textarea" type="text" id="nDescription" />
        </div>
        <div>
          <label htmlFor="nImgURL" className="input-tag">SMALL IMAGE URL (460 x 215 recommended)</label>
          <input className="gf-input" type="text" id="nImgURL" />
        </div>
        <div>
          <label htmlFor="nBackgroundImg" className="input-tag">COVER IMAGE URL (1080 x 350 recommended)</label>
          <input className="gf-input" type="text" id="nBackgroundImg" />
        </div>
        <p className="builds-subtitle input-tag">GAME BUILDS</p>
        <div className="os-picker row">
          <div className="col-md-6">
            <a href="#windowsBuild" onClick={this.handleBuildClick} className="os-selected"><i className="fa fa-windows" /></a>
          </div>
          <div className="col-md-6">
            <a href="#appleBuild" onClick={this.handleBuildClick}><i className="fa fa-apple" /></a>
          </div>
        </div>
        <div className="row builds">
          <div className="col-md-6">
            <input id="windowsBuild" type="file" accept=".zip" onChange={this.handleBuildFileChange} />
            <p id="win-br" className="build-reqs">Must be a .zip file containing the .exe on the first layer of the .zip file. (So yourgame.zip/yourgame.exe is good, but yourgame.zip/rand_dir/yourgame.exe is bad)</p>
          </div>
          <div className="col-md-6">
            <input id="appleBuild" className="hidden" type="file" accept=".zip" onChange={this.handleBuildFileChange} />
            <p id="mac-br" className="build-reqs hidden">Must be a .zip file containing only your .app build for your game.</p>
          </div>
        </div>
        {isEditing &&
          <p className="input-tag">NOTE: To replace your current build just upload another one</p>
        }
        <div className="win-exe">
          <label htmlFor="nWinExe" className="input-tag">NAME OF YOUR WINDOWS .exe FILE (i.e. GAME.exe)</label>
          <input className="gf-input" type="text" id="nWinExe" />
        </div>
        <div>
          <label htmlFor="nVideoLinks" className="input-tag">GALLERY VIDEO URLs (Separate them with a whitespace)</label>
          <input className="gf-input" type="text" id="nVideoLinks" />
        </div>
        <div>
          <label htmlFor="nGalleryLinks" className="input-tag">GALLERY IMAGE URLs (Separate them with a whitespace)</label>
          <input className="gf-input" type="text" id="nGalleryLinks" />
        </div>
        {isPrivate &&
          <div>
            <a href="#priv" className="btn private-btn active" onClick={this.togglePermission}><i className="fa fa-lock" /> Private</a>
            <a href="#pub" className="btn public-btn" onClick={this.togglePermission}><i className="fa fa-globe" /> Public</a>
            <p className="input-tag private">INVITE ONLY</p>
          </div>
        }
        {!isPrivate &&
          <div>
            <a href="#priv" className="btn private-btn" onClick={this.togglePermission}><i className="fa fa-lock" /> Private</a>
            <a href="#pub" className="btn public-btn active" onClick={this.togglePermission}><i className="fa fa-globe" /> Public</a>
            <p className="input-tag public">AVAILABLE FOR EVERYONE</p>
          </div>
        }
        {!isUploading && !isEditing &&
          <a href="#submit" className="btn play-btn" onClick={this.handleSubmit}>Submit game</a>
        }
        {!isUploading && isEditing &&
          <a href="#save" className="btn play-btn" onClick={this.handleEdit}>Save changes</a>
        }
        {isUploading &&
          <span>Upload in progress <i className="fa fa-spinner fa-pulse fa-fw" /></span>
        }
      </form>
    );
  }
}
