import React from 'react';
import Slider from "react-slick";
import img1 from '../../../assets/images/sliderImage/1.jpg'
import img2 from '../../../assets/images/sliderImage/2.jpg'
import img3 from '../../../assets/images/sliderImage/3.jpg'
import img4 from '../../../assets/images/sliderImage/4.jpg'
import img5 from '../../../assets/images/sliderImage/5.jpg'
import img6 from '../../../assets/images/sliderImage/6.jpg'
import img7 from '../../../assets/images/sliderImage/7.jpg'
import img8 from '../../../assets/images/sliderImage/8.jpg'
import img9 from '../../../assets/images/sliderImage/9.jpg'
import img10 from '../../../assets/images/sliderImage/10.jpg'
import img11 from '../../../assets/images/sliderImage/11.jpg'
import img12 from '../../../assets/images/sliderImage/12.jpg'
import img13 from '../../../assets/images/sliderImage/13.jpg'
import img14 from '../../../assets/images/sliderImage/14.jpg'
import './ItemSlider.css'

const ItemSlider = () => {
    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear"
    };
    return (
        <div className='py-12'>
            <Slider {...settings}>
                <div className="m-2">
                    <img className='mx-auto ms-2 m-2' src={img1} alt="" />
                </div>
                <div className="m-2">
                    <img className=' mx-auto ms-2 m-2' src={img2} alt="" />
                </div>
                <div className="m-2">
                    <img className=' mx-auto ms-2 m-2' src={img3} alt="" />
                </div>
                <div className="m-2">
                    <img className=' mx-auto ms-2 m-2' src={img4} alt="" />
                </div>
                <div className="m-2">
                    <img className=' mx-auto ms-2 m-2' src={img5} alt="" />
                </div>
                <div className="m-2">
                    <img className=' mx-auto ms-2 m-2' src={img6} alt="" />
                </div>
                <div className="m-2">
                    <img className=' mx-auto ms-2 m-2' src={img7} alt="" />
                </div>
                <div className="m-2">
                    <img className=' mx-auto ms-2 m-2' src={img8} alt="" />
                </div>
                <div className="m-2">
                    <img className=' mx-auto ms-2 m-2' src={img9} alt="" />
                </div>
                <div className="m-2">
                    <img className=' mx-auto ms-2 m-2' src={img10} alt="" />
                </div>
                <div className="m-2">
                    <img className=' mx-auto ms-2 m-2' src={img11} alt="" />
                </div>
                <div className="m-2">
                    <img className=' mx-auto ms-2 m-2' src={img12} alt="" />
                </div>
                <div className="m-2">
                    <img className=' mx-auto ms-2 m-2' src={img13} alt="" />
                </div>
                <div className="m-2">
                    <img className=' mx-auto ms-2 m-2' src={img14} alt="" />
                </div>
            </Slider>
        </div>
    );
};

export default ItemSlider;