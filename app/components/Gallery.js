// @flow
import React, { Component } from 'react';
import Slider from 'react-slick';

class Gallery extends Component {
  props: {
    images: Array<string>,
    videos: Array<string>
  }
  render() {
    const { images, videos } = this.props;

    if (images.length === 0 && videos.length === 0) {
      return <p>Did not find any videos or images</p>;
    }

    const videosJSX = videos.map((video, i) => {
      if (i === 0) {
        return (
          <div className="" key={`vid${video}`}>
            <iframe className="sd-item" src={`${video}?enablejsapi=1`} frameBorder="0" width="100%" height="100%" id={`trailerFrame${i}`} />
          </div>
        );
      }
      return (
        <div key={`vid${video}`}>
          <iframe className="sd-item" src={`${video}?enablejsapi=1`} frameBorder="0" width="100%" height="100%" id={`trailerFrame${i}`} />
        </div>
      );
    });
    const imagesJSX = images.map((image) =>
      <div key={image}>
        <img className="sd-item" src={image} alt="Game screenshot" />
      </div>
    );
    const settings = {
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
    );
  }
}

export default Gallery;
