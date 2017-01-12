import React, { Component } from 'react';
import Slider from 'react-slick';

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

    if (images.length == 0 && videos.length == 0) {
      return <p>Did not find any videos or images</p>
    }

    //let indicators = this.getIndicators(videos.length, images.length);
    let videosJSX = videos.map((video, i) => {
      if (i == 0) {
        return (
          <div className="">
            <iframe className="sd-item" src={video+"?enablejsapi=1"} frameBorder="0" width="100%" height="100%" id={"trailerFrame"+i}></iframe>
          </div>
        )
      }
      else {
        return (
          <div>
            <iframe className="sd-item" src={video+"?enablejsapi=1"} frameBorder="0" width="100%" height="100%" id={"trailerFrame"+i}></iframe>
          </div>
        )
      }
    });
    let imagesJSX = images.map((image, i) => {
      return (
        <div>
          <img className="sd-item"src={image} alt="Gallery Image" />
        </div>
      );
    });
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings}>
        {videosJSX}
        {imagesJSX}
      </Slider>
    )
  }
}
