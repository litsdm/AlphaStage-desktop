import React, { Component } from 'react';
import Slider from 'react-slick';

export default class Gallery extends Component {
  render() {
    const { images, videos } = this.props

    if (images.length == 0 && videos.length == 0) {
      return <p>Did not find any videos or images</p>
    }

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
