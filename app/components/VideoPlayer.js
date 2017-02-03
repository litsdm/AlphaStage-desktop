import React, { Component } from 'react';
import $ from 'jquery';

export default class VideoPlayer extends Component {
  componentDidMount() {
    this.refresh();
    $refreshButton.click(this.refresh());

    // Select all the contents when clicked
    $results.click(function(){
      $(this).select();
    });
  }

  refresh(){
    var css = $('style.cp-pen-styles').text();
    $results.html(css);
  }

  render() {
    const { gameplay } = this.props;
    return (
      <video id="home_video" className="video-js vjs-default-skin" controls preload="none" width="640" height="264"
        poster="https://i.ytimg.com/vi/NpEaa2P7qZI/maxresdefault.jpg" data-setup=''>
        <source src={gameplay.cloudfrontURL} type='video/mp4'/>
      </video>
    )
  }
}
