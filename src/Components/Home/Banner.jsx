import React from 'react';
import slide1 from '../../Assets/img/bannar/bannar1.jpg';
import slide2 from '../../Assets/img/bannar/bannar2.jpg';
import slide3 from '../../Assets/img/bannar/bannar3.jpeg';

const Banner = () => {
  return (
    <div className="carousel w-full z-0" data-interval="false">
      <div id="slide1" className="carousel-item relative w-full">
        <img alt='Slide' src={slide3} className="w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle btn-primary">❮</a>
          <a href="#slide2" className="btn btn-circle btn-primary">❯</a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <img alt='Slide' src={slide2} className="w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle btn-primary">❮</a>
          <a href="#slide3" className="btn btn-circle btn-primary">❯</a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <img alt='Slide' src={slide1} className="w-full" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle btn-primary">❮</a>
          <a href="#slide1" className="btn btn-circle btn-primary">❯</a>
        </div>
      </div>
    </div>
  );
};

export default Banner;