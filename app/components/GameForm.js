import React, { Component } from 'react';
import $ from 'jquery';

export default class GameForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Submitting game form...');
    const nameRef = this.refs.name;
    const descriptionRef = this.refs.description;
    const imgURLRef = this.refs.imgURL;
    if (nameRef.value && descriptionRef.value && imgURLRef.value) {
      this.props.addGame(nameRef.value, descriptionRef.value, imgURLRef.value);
      nameRef.value = descriptionRef.value = imgURLRef.value = '';
    }
  }

  handleBuildClick(event) {
    event.preventDefault();
    const $parent = $(event.target.parentElement);
    const elementId = event.target.parentElement.getAttribute('href');
    const $targetElement = $(elementId)

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
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
