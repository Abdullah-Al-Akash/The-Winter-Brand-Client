import React from 'react';
import { BiLogoInstagramAlt } from 'react-icons/bi';
import { BsFacebook } from 'react-icons/bs';
import { RiTiktokLine } from 'react-icons/ri';

const AboutComponent = () => {
    return (
        <div className="container mx-auto p-4 md:p-0">
            <h1 className="text-center text-3xl font-semibold my-10">About The <span className="brand-color">Winter Brand</span></h1>
            <div className="md:px-16 p-2 bg-orange-50 py-4">
                <p className='text-center'>Welcome to The Winter Brand, your go-to destination for high-quality, stylish beanies that keep you warm and comfortable throughout the cold season.</p>
                <p className='text-center mt-6'>At TWB, We believe the season should be celebrated, not endured. We’re passionate about creating premium beanies that are both functional and fashionable, so you can stay cozy and stylish no matter what the temperature is.</p>
                <p className='text-center mt-6'>Our mission is to provide our customers with the best possible beanies that are both are durable and stylish. We believe in using only the finest materials to create our products, so you can trust that your beanie will last for many seasons to come. We’re committed to customer satisfaction and strive to provide an exceptional shopping experience, from browsing our website to receiving your order.</p>
            </div>
            <div className="my-10 bg-[#141414] py-10 shadow-2xl rounded-lg">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex justify-center items-center">
                        <h2 className="text-white font-semibold text-3xl">Our Values</h2>
                    </div>
                    <div className="text-white flex justify-center items-center">
                        <div>
                            <li>Quality over quantity</li>
                            <li>Positive ecology impact
                            </li>
                            <li>Products variety
                            </li>
                            <li>Safe & easy payments
                            </li>
                        </div>
                    </div>
                </div>
            </div>
            <div className="my-10">
                <div className="grid md:grid-cols-2 grid-4">
                    <div className="md:p-8 flex justify-center items-center">
                        <img className='rounded' src="https://i.etsystatic.com/9616086/r/il/e77471/4131946592/il_570xN.4131946592_78zt.jpg" alt="" />
                    </div>
                    <div className="md:p-8">
                        <div>
                            <h3 className="text-3xl brand-color my-4 font-semibold">Our vision</h3>
                            <div className="flex items-center gap-2 text-white my-4">
                                <a
                                    target="_blank"
                                    href="https://www.facebook.com/HiverBrand"
                                    className="bg-[#1778f2] p-3 rounded-full"
                                >
                                    <BsFacebook></BsFacebook>
                                </a>
                                <a
                                    target="_blank"
                                    href="https://www.instagram.com/thewinterbrand/"
                                    className="bg-[#f00075] p-3 rounded-full"
                                >
                                    <BiLogoInstagramAlt></BiLogoInstagramAlt>
                                </a>

                                <a
                                    target="_blank"
                                    href="https://www.tiktok.com/@the.winter.brand"
                                    className=" text-white bg-black p-3 rounded-full"
                                >
                                    <RiTiktokLine></RiTiktokLine>
                                </a>
                            </div>
                            <p>Our vision is to become the leading provider of high-quality winter beanies, both locally and globally. We’re constantly innovating and improving our products to meet the evolving needs and preferences of our customers. We aim to establish a strong and loyal community of winter enthusiasts who share our love for staying cozy and stylish.</p>
                            <p className='mt-6'>Thank you for choosing The Winter as your preferred destination for winter beanies. We’re excited to help you stay warm and stylish this winter season and beyond.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutComponent;