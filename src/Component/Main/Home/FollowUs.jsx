import React from "react";
import "./FollowUs.css";
import img1 from "../../../assets/images/FollowUs/1.jpg";
import img2 from "../../../assets/images/FollowUs/2.jpg";
import img3 from "../../../assets/images/FollowUs/3.jpg";
import img4 from "../../../assets/images/FollowUs/4.jpg";
import img5 from "../../../assets/images/FollowUs/5.jpg";
import img6 from "../../../assets/images/FollowUs/6.jpg";
import Slider from "react-slick";

const FollowUs = () => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <div className="flex justify-center items-center py-16">
        <div className="text-center">
          <h1 className="text-3xl font-semibold m-4">
            THE <span className="brand-color">WINTER BRAND</span> ON INSTAGRAM
          </h1>
          <a target="_blank" href="" className="brand-color text-sm">
            FOLLOW US ON INSTAGRAM
          </a>
        </div>
      </div>
      <div>
        <Slider {...settings}>
          <img src={img1} alt="" />

          <img src={img2} alt="" />

          <img src={img3} alt="" />

          <img src={img4} alt="" />

          <img src={img1} alt="" />

          <img src={img2} alt="" />
        </Slider>
      </div>
    </div>
  );
};

export default FollowUs;
