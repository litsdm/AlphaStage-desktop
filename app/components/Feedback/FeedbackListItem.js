import React, { Component } from 'react';
var dateFormat = require('dateformat');
import $ from 'jquery';

export default class FeedbackListItem extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    const { feedback, handleClick, index } = this.props;
    handleClick(feedback, index)
  }

  componentDidMount() {
    const { bgURL } = this.props;

    $('.gli').css('background-image', 'radial-gradient(ellipse at bottom, rgba(34, 34, 34, 0.6) 0%, #111 100%), url(' + bgURL + ')');
  }

  render() {
    const { feedback } = this.props;
    let gameplay = feedback.gameplay
    const date = dateFormat(gameplay.createdAt, "ddd, mmm d, h:MM TT");

    return(
      <a href="#" className="show-modal" onClick={this.onClick}>
        <div className="bg-img"></div>
        <div className="gli">
          <div className="row">
            No content design yet
          </div>
        </div>
      </a>
    )
  }
}
