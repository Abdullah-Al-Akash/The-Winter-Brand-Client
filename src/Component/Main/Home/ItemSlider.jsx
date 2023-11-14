import React, { useEffect } from "react";
import Slider from "react-slick";
import img1 from "../../../assets/images/default-image.jpg";

import "./ItemSlider.css";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

const ItemSlider = () => {
  const { axiosSecure } = useAxiosSecure();
  const [images, setImages] = useState([]);
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };
  useEffect(() => {
    axiosSecure
      .get("/get-featured-images")
      .then((res) => setImages(res?.data?.data))
      .catch((err) => {
        console.log(err?.message);
      });
  }, []);
  const defaultImage = [1, 2, 3, 4, 5, 6];
  return (
    <div className="pt-12">
      <Slider {...settings} className="border-none">
        {images?.map((image, i) => {
              return (
                <img
                  key={i}
                  className="h-full mx-auto"
                  src={image?.image_url}
                  alt=""
                />
              );
            })
          }
      </Slider>
    </div>
  );
};

export default ItemSlider;
