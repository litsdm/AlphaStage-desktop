import React, { Component } from 'react';
import $ from 'jquery';

export default class GameForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      windowsActive: true,
      macActive: false,
      linuxActive: false
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBuildClick = this.handleBuildClick.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const nameRef = this.refs.name;
    const descriptionRef = this.refs.description;
    const imgURLRef = this.refs.imgURL;
    const backgroundImgRef = this.refs.backgroundImg;
    const macBuildRef = this.refs.macBuild;
    const windowsBuildRef = this.refs.windowsBuild;
    const linuxBuildRef = this.refs.linuxBuild;

    console.log(macBuildRef.files[0]);

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
    else if (!this.state.windowsActive && !this.state.macActive && !this.state.linuxActive) {
      this.showError("You must select at least one OS.");
      return
    }
    else if (this.state.windowsActive && windowsBuildRef.files.length == 0) {
      this.showError("Please add a Windows build or deselect the OS.");
      return
    }
    else if (this.state.macActive && macBuildRef.files.length == 0) {
      this.showError("Please add a macOS build or deselect the OS.");
      return
    }
    else if (this.state.linuxBuild && linuxBuildRef.files.length == 0) {
      this.showError("Please add a Linux build or deselect the OS.");
      return
    }

    const availableOn = {
      windows: this.state.windowsActive,
      macOS: this.state.macActive,
      linux: this.state.linuxActive
    }

    const game = {
      name: nameRef.value,
      description: descriptionRef.value,
      img: imgURLRef.value,
      backgroundImg: backgroundImgRef.value,
      availableOn
    }

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
      case "#linuxBuild":
        this.setState({ linuxActive: !this.state.linuxActive });
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

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Name</label>
          <input className="gf-input" type="text" ref="name" />
        </div>
        <div>
          <label>Short Description</label>
          <textarea className="gf-textarea" type="text" ref="description" />
        </div>
        <div>
          <label>Small Image URL (460 x 215)</label>
          <input className="gf-input" type="text" ref="imgURL" />
        </div>
        <div>
          <label>Big Image URL</label>
          <input className="gf-input" type="text" ref="backgroundImg" />
        </div>
        <p className="builds-subtitle">Game builds</p>
        <div className="os-picker row">
          <div className="col-md-4">
            <a href="#windowsBuild" onClick={this.handleBuildClick} className="os-selected"><i className="fa fa-windows" /></a>
          </div>
          <div className="col-md-4">
            <a href="#appleBuild" onClick={this.handleBuildClick}><i className="fa fa-apple" /></a>
          </div>
          <div className="col-md-4">
            <a href="#linuxBuild" onClick={this.handleBuildClick}><i className="fa fa-linux" /></a>
          </div>
        </div>
        <div className="row builds">
          <div id="windowsBuild" className="col-md-4">
            <input type="file" accept=".exe, .zip" ref="windowsBuild" />
          </div>
          <div id="appleBuild" className="hidden col-md-4">
            <input type="file" accept=".dmg, .zip, .app" ref="macBuild" />
          </div>
          <div id="linuxBuild" className="hidden col-md-4">
            <input type="file" ref="linuxBuild" />
          </div>
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
      </form>
    )
  }
}
