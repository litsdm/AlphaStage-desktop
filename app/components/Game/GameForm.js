import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import $ from 'jquery';
import toastr from 'toastr';

export default class GameForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      windowsActive: true,
      macActive: false,
      isPrivate: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleBuildClick = this.handleBuildClick.bind(this);
    this.handleBuildFileChange = this.handleBuildFileChange.bind(this);
    this.togglePermission = this.togglePermission.bind(this);
    this.createGame = this.createGame.bind(this);
    this.validateGame = this.validateGame.bind(this);
  }

  componentDidMount() {
    const { game } = this.props;

    if (game) {
      this.editValues(game);
    }
  }

  handleBuildFileChange(e) {
    const { getSignedRequest } = this.props;

    const files = e.target.files;
    const file = files[0];

    if(file == null){
      return
    }

    const $target = $(e.target);
    const isWinBuild = ($target.attr('id') == 'windowsBuild');

    getSignedRequest(file, isWinBuild);
  }

  handleEdit(e) {
    e.preventDefault();
    const { editGame, changeRoute } = this.props;

    if (!this.validateGame()) {
      return
    }

    let game = this.createGame();

    editGame(game);
    changeRoute('/dashboard');
  }

  handleSubmit(e) {
    e.preventDefault();
    const { addGame, changeRoute } = this.props;

    if (!this.validateGame()) {
      return
    }

    let game = this.createGame();

    addGame(game);
    changeRoute('/dashboard');
  }

  createGame() {
    const { windowsActive, macActive, isPrivate } = this.state;
    const { macURL, winURL, isUploading, macName, winName } = this.props;
    const { name, description, imgURL, backgroundImg, videoLinks, galleryLinks, winExe} = this.refs;

    let videos = videoLinks.value.match(/\S+/g);
    let images = galleryLinks.value.match(/\S+/g);

    let embeddedVideos = videos.map((video) => this.formatVideoURL(video))

    let availableOn = {
      windows: windowsActive,
      macOS: macActive,
    }

    let token = localStorage.getItem('id_token');
    let currentUser = jwtDecode(token);

    let game = {
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
    }

    return game
  }

  validateGame() {
    const { windowsActive, macActive } = this.state;

    let nameRef = this.refs.name;
    let descriptionRef = this.refs.description;
    let imgURLRef = this.refs.imgURL;
    let backgroundImgRef = this.refs.backgroundImg;
    let macBuildRef = this.refs.macBuild;
    let windowsBuildRef = this.refs.windowsBuild;
    let videoLinksRef = this.refs.videoLinks;
    let galleryLinksRef = this.refs.galleryLinks;
    let winExeRef = this.refs.winExe;

    if (!nameRef.value) {
      nameRef.focus();
      this.showError("Name field must not be empty.")
      return false
    }
    else if (!descriptionRef.value) {
      descriptionRef.focus();
      this.showError("Description field must not be empty.");
      return false
    }
    else if (!imgURLRef.value) {
      imgURLRef.focus();
      this.showError("Image field must not be empty.");
      return false
    }
    else if (!windowsActive && !macActive) {
      this.showError("You must select at least one OS.");
      return false
    }
    else if (windowsActive && windowsBuildRef.files.length == 0) {
      this.showError("Please add a Windows build or deselect the OS.");
      return false
    }
    else if (macActive && macBuildRef.files.length == 0) {
      this.showError("Please add a macOS build or deselect the OS.");
      return false
    }
    else if (!galleryLinksRef.value) {
      this.showError("Please add at least one image for the gallery. Remember to separate them with whitespaces!");
      return false
    }
    else if (!winExeRef.value && windowsActive) {
      this.showError("Please write the name of your windows .exe file.");
      return false
    }

    return true
  }

  showError(message) {
    toastr.error(message);
  }

  handleBuildClick(e) {
    e.preventDefault();
    let $parent = $(e.target.parentElement);
    let elementId = e.target.parentElement.getAttribute('href');
    let $targetElement = $(elementId)

    switch (elementId) {
      case "#windowsBuild":
        this.setState({ windowsActive: !this.state.windowsActive });
        $('.win-exe').toggleClass('hidden');
        $('#win-br').toggleClass('hidden');
        break;
      case "#appleBuild":
        this.setState({ macActive: !this.state.macActive });
        $('#mac-br').toggleClass('hidden');
        break;
      default: break;
    }

    $targetElement.toggleClass('hidden');
    $parent.toggleClass('os-selected');
  }

  togglePermission(e) {
    e.preventDefault();

    this.setState({ isPrivate: !this.state.isPrivate })
  }

  formatVideoURL(video) {
    if (video.includes('embed')) {
      return video
    }
    else if (video.includes('v=')) {
      let parts = video.split('v=');
      return "https://www.youtube.com/embed/" + parts.pop();
    }
    else {
      let parts = video.split('/');
      return "https://www.youtube.com/embed/" + parts.pop();
    }
  }

  editValues(game) {
    const { name, description, imgURL, backgroundImg, videoLinks, galleryLinks, winExe} = this.refs;

    name.value = game.name;
    description.value = game.description;
    imgURL.value = game.img;
    backgroundImg.value = game.backgroundImg;
    videoLinks.value = game.videoLinks.join(' ');
    galleryLinks.value = game.galleryLinks.join(' ');
    winExe.value = game.winExe;
  }

  render() {
    const { isUploading, isEditing } = this.props;
    const { isPrivate } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label className="input-tag">NAME</label>
          <input className="gf-input" type="text" ref="name" />
        </div>
        <div>
          <label className="input-tag">SHORT DESCRIPTION</label>
          <textarea className="gf-textarea" type="text" ref="description" />
        </div>
        <div>
          <label className="input-tag">SMALL IMAGE URL (460 x 215 recommended)</label>
          <input className="gf-input" type="text" ref="imgURL" />
        </div>
        <div>
          <label className="input-tag">COVER IMAGE URL (1080 x 350 recommended)</label>
          <input className="gf-input" type="text" ref="backgroundImg" />
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
            <input id="windowsBuild" type="file" accept=".zip" ref="windowsBuild" onChange={this.handleBuildFileChange} />
            <p id="win-br" className="build-reqs">Must be a .zip file containing the .exe on the first layer of the .zip file. (So yourgame.zip/yourgame.exe is good, but yourgame.zip/rand_dir/yourgame.exe is bad)</p>
          </div>
          <div className="col-md-6">
            <input id="appleBuild" className="hidden" type="file" accept=".zip" ref="macBuild" onChange={this.handleBuildFileChange}/>
            <p id="mac-br" className="build-reqs hidden">Must be a .zip file containing only your .app build for your game.</p>
          </div>
        </div>
        <div className="win-exe">
          <label className="input-tag">NAME OF YOUR WINDOWS .exe FILE (i.e. GAME.exe)</label>
          <input className="gf-input" type="text" ref="winExe" />
        </div>
        <div>
          <label className="input-tag">GALLERY VIDEO URLs (Separate them with a whitespace)</label>
          <input className="gf-input" type="text" ref="videoLinks" />
        </div>
        <div>
          <label className="input-tag">GALLERY IMAGE URLs (Separate them with a whitespace)</label>
          <input className="gf-input" type="text" ref="galleryLinks" />
        </div>
        {isPrivate &&
          <div>
            <a href="#" className="btn private-btn active" onClick={this.togglePermission}><i className="fa fa-lock"></i> Private</a>
            <a href="#" className="btn public-btn" onClick={this.togglePermission}><i className="fa fa-globe"></i> Public</a>
            <p className="input-tag private">INVITE ONLY</p>
          </div>
        }
        {!isPrivate &&
          <div>
            <a href="#" className="btn private-btn" onClick={this.togglePermission}><i className="fa fa-lock"></i> Private</a>
            <a href="#" className="btn public-btn active" onClick={this.togglePermission}><i className="fa fa-globe"></i> Public</a>
            <p className="input-tag public">AVAILABLE FOR EVERYONE</p>
          </div>
        }
        {!isUploading && !isEditing &&
          <a href="#" className="btn play-btn" onClick={this.handleSubmit}>Submit game</a>
        }
        {!isUploading && isEditing &&
          <a href="#" className="btn play-btn" onClick={this.handleEdit}>Save changes</a>
        }
        {isUploading &&
          <span>Upload in progress <i className="fa fa-spinner fa-pulse fa-fw"></i></span>
        }
      </form>
    )
  }
}
