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



    //this.props.changeRoute('/browse');

    /*if (nameRef.value && descriptionRef.value && imgURLRef.value) {
      this.props.addGame(nameRef.value, descriptionRef.value, imgURLRef.value);
      nameRef.value = descriptionRef.value = imgURLRef.value = '';
    }*/
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
        <p>
          <input type="text" ref="name" placeholder="Name" />
        </p>
        <p>
          <input type="text" ref="description" placeholder="Description" />
        </p>
        <p>
          <input type="text" ref="imgURL" placeholder="Image URL" />
        </p>
        <div className="os-picker">
          <a href="#windowsBuild" onClick={this.handleBuildClick} className="os-selected"><i className="fa fa-windows" /></a>
          <a href="#appleBuild" onClick={this.handleBuildClick}><i className="fa fa-apple" /></a>
          <a href="#linuxBuild" onClick={this.handleBuildClick}><i className="fa fa-linux" /></a>
        </div>
        <p id="windowsBuild" className="">
          Windows Build:
          <input type="file" accept=".exe, .zip" ref="windowsBuild" />
        </p>
        <p id="appleBuild" className="hidden">
          macOS Build:
          <input type="file" accept=".dmg, .zip, .app" ref="macBuild" />
        </p>
        <p id="linuxBuild" className="hidden">
          Linux Build:
          <input type="file" ref="linuxBuild" />
        </p>
        <p id="error-label" className="hidden">errorLabel</p>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
