import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';
import $ from 'jquery';

export default class GameForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      windowsActive: true,
      macActive: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBuildClick = this.handleBuildClick.bind(this);
    this.handleBuildFileChange = this.handleBuildFileChange.bind(this);
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

    const prefix = (isWinBuild ? 'win' : 'mac') + new Date().getTime()
    const reqFile = {
      name: prefix + file.name,
      type: file.type
    }

    getSignedRequest(reqFile);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { windowsActive, macActive } = this.state;

    const nameRef = this.refs.name;
    const descriptionRef = this.refs.description;
    const imgURLRef = this.refs.imgURL;
    const backgroundImgRef = this.refs.backgroundImg;
    const macBuildRef = this.refs.macBuild;
    const windowsBuildRef = this.refs.windowsBuild;
    const videoLinksRef = this.refs.videoLinks;
    const galleryLinksRef = this.refs.galleryLinks;

    if (!nameRef.value) {
      nameRef.focus();
      this.showError("Name field must not be empty.")
      return
    }
    else if (!descriptionRef.value) {
      descriptionRef.focus();
      this.showError("Description field must not be empty.");
      return
    }
    else if (!imgURLRef.value) {
      imgURLRef.focus();
      this.showError("Image field must not be empty.");
      return
    }
    else if (!windowsActive && !macActive) {
      this.showError("You must select at least one OS.");
      return
    }
    else if (windowsActive && windowsBuildRef.files.length == 0) {
      this.showError("Please add a Windows build or deselect the OS.");
      return
    }
    else if (macActive && macBuildRef.files.length == 0) {
      this.showError("Please add a macOS build or deselect the OS.");
      return
    }
    else if (!videoLinksRef.value) {
      this.showError("Please add at least one video. Remember to separate them with whitespaces!");
      return
    }
    else if (!galleryLinks.value) {
      this.showError("Please add at least one image for the gallery. Remember to separate them with whitespaces!");
      return
    }

    const videos = videoLinksRef.value.match(/\S+/g);
    const images = galleryLinksRef.value.match(/\S+/g);

    const availableOn = {
      windows: this.state.windowsActive,
      macOS: this.state.macActive,
    }

    let currentUser = jwtDecode(token);

    const game = {
      name: nameRef.value,
      description: descriptionRef.value,
      img: imgURLRef.value,
      backgroundImg: backgroundImgRef.value,
      availableOn,
      videoLinks: videos,
      galleryLinks: images,
      developer: currentUser._id
    }

    const file = macBuildRef.files[0]
    //console.log(file);
    const formData = new FormData();
    formData.append('macBuild', file, file.name)

    //this.props.uploadBuild(file);

    this.props.addGame(game);
    this.props.changeRoute('/browse');
  }

  showError(error) {
    const $errorLabel = $('#error-label');
    $errorLabel.css('display', 'block');
    $errorLabel.text(error);
  }

  handleBuildClick(event) {
    event.preventDefault();
    const $parent = $(event.target.parentElement);
    const elementId = event.target.parentElement.getAttribute('href');
    const $targetElement = $(elementId)

    switch (elementId) {
      case "#windowsBuild":
      this.setState({ windowsActive: !this.state.windowsActive });
      break;
      case "#appleBuild":
      this.setState({ macActive: !this.state.macActive });
      break;
      default: break;
    }

    if ($targetElement.hasClass('hidden')) {
      $targetElement.removeClass('hidden');
      $parent.addClass('os-selected');
    }
    else {
      $targetElement.addClass('hidden');
      $parent.removeClass('os-selected');
    }
  }

  handleLinkString(event) {
    let linkString = event.target.value
    let linkArr = linkString.match(/\S+/g);
    console.log(linkArr);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p className="builds-subtitle">Game builds</p>
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
            <input id="windowsBuild" type="file" accept=".exe, .zip" ref="windowsBuild" onChange={this.handleBuildFileChange} />
          </div>
          <div className="col-md-6">
            <input id="appleBuild" className="hidden" type="file" accept=".dmg, .zip, .app" ref="macBuild" />
          </div>
        </div>
        <div>
          <label>Name</label>
          <input className="gf-input" type="text" ref="name" />
        </div>
        <div>
          <label>Short Description</label>
          <textarea className="gf-textarea" type="text" ref="description" />
        </div>
        <div>
          <label>Small Image URL (460 x 215 recommended)</label>
          <input className="gf-input" type="text" ref="imgURL" />
        </div>
        <div>
          <label>Cover Image URL (1080 x 350 recommended)</label>
          <input className="gf-input" type="text" ref="backgroundImg" />
        </div>
        <div>
          <label>Gallery Video URLs (Separate them with a whitespace)</label>
          <input className="gf-input" type="text" ref="videoLinks" />
        </div>
        <div>
          <label>Gallery Image URLs (Separate them with a whitespace)</label>
          <input className="gf-input" type="text" ref="galleryLinks" />
        </div>
        <p id="error-label" className="hidden">errorLabel</p>
        <a href="#" className="btn play-btn" onClick={this.handleSubmit}>Create</a>
        <span>Upload in progress <i className="fa fa-spinner fa-pulse fa-fw"></i></span>
      </form>
    )
  }
}
