import React, { Component } from 'react';

export default class Gallery extends Component {

  getIndicators(videosLength, imagesLength) {
    let indicators = [];
    for (var i = 0; i < imagesLength + videosLength; i++) {
      if (i == 0 && videosLength > 0) {
        indicators.push(<li className="active vid-indicator" data-target="#gameGalleryCarousel" data-slide-to={i}></li>)
      }
      else if (i == 0 && videosLength <= 0) {
        indicators.push(<li className="active" data-target="#gameGalleryCarousel" data-slide-to={i}></li>)
      }
      else if (i < videosLength - 1) {
        indicators.push(<li className="vid-indicator" data-target="#gameGalleryCarousel" data-slide-to={i}></li>)
      }
      else {
        indicators.push(<li data-target="#gameGalleryCarousel" data-slide-to={i}></li>)
      }
    }
    return indicators
  }

  render() {
    const { images, videos } = this.props

    let indicators = getIndicators(videos.length, images.length);
    let videosJSX = videos.map((video, i) => {
      if (i == 0) {
        return (
          <div className="item active vid">
            <iframe src={video+"?enablejsapi=1"} frameborder="0" width="100%" height="100%" id={"trailerFrame"+i}></iframe>
          </div>
        )
      }
      else {
        return (
          <div className="item vid">
            <iframe src={video+"?enablejsapi=1"} frameborder="0" width="100%" height="100%" id={"trailerFrame"+i}></iframe>
          </div>
        )
      }
    });
    let imagesJSX = images.map((image, i) => {
      return (
        <div class="item">
          <img src={image} alt="Gallery Image" />
        </div>
      );
    });

    return (
      <div id="gameGalleryCarousel" class="carousel slide gallery">
        <ol class="carousel-indicators">
            {indicators}
          </ol>
          <div class="carousel-inner" role="listbox">
            {videosJSX}
            {imagesJSX}
          </div>
          <a class="left carousel-control" href="#gameGalleryCarousel" role="button" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="right carousel-control" href="#gameGalleryCarousel" role="button" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
      </div>
    )
  }
}
