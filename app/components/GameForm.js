import React, { Component } from 'react';

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
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
