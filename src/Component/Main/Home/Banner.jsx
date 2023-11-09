import React, { useContext } from 'react';
import './Banner.css'
import { TypeAnimation } from 'react-type-animation';
import DrawerComponent from '../../../Sheard/Drawer/DrawerComponent';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import img from '../../../assets/HowItWork/MakeWinterPerfect.png'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

const Banner = () => {

    const { isOpen, setIsOpen, toggleDrawer } = useContext(AuthContext);
    return (
        <div className="banner-content">
            {/* <div className="flex justify-center items-center h-[80vh]">
                <div className="">
                    <h1 className='md:text-4xl text-2xl font-semibold '>Elevate Your <span className="brand-color font-bold md:text-5xl text-3xl">Winter Style</span> <br />  </h1>
                    <h1 className='md:text-4xl text-2xl font-semibold mt-2'>with Our</h1>
                    <h1 className='md:text-4xl text-2xl mt-3'>Cozy <span className="brand-color font-semibold">Beanie Bundle</span>!</h1>
                    <h3 className='text-gray-300 text-xl mt-5'>Everything in one Bundle: Unparalleled Quality, Unbeatable Price, and Fashion Forward</h3>
                    <div className='mt-3'>
                        <span className='bg-black brand-color p-2 rounded text-lg font-semibold'>
                            <TypeAnimation
                                sequence={[
                                    'Black Friday Special: ',
                                    1000,
                                    'Black Friday Special: Now only $39',
                                    1000,
                                    'Black Friday Special: Now only $39',
                                    1000,
                                    'Black Friday Special: Now only $39',
                                    1000,
                                ]}
                                speed={50}
                                repeat={Infinity}
                            />
                        </span>
                    </div>
                    <div className='mt-5'>
                        <button onClick={toggleDrawer} className='btn brand-btn font-bold'>Get The Bundle</button>
                    </div>
                </div>
            </div> */}
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="grid lg:grid-cols-2 gap-4 px-4 md:px-24 py-24">
                        <div data-aos="fade-right"
                            data-aos-offset="200"
                            data-aos-delay="50"
                            data-aos-duration="1000"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="false" className="">
                            <h1 className='md:text-4xl text-2xl font-semibold '>Elevate Your <span className="brand-color font-bold md:text-5xl text-3xl">Winter Style</span> <br />  </h1>
                            <h1 className='md:text-4xl text-2xl font-semibold mt-2'>with Our</h1>
                            <h1 className='md:text-4xl text-2xl mt-3'>Cozy <span className="brand-color font-semibold">Beanie Bundle</span>!</h1>
                            <h3 className='text-gray-300 text-xl mt-5'>Everything in one Bundle: Unparalleled Quality, Unbeatable Price, and Fashion Forward</h3>
                            <div className='mt-3'>
                                <span className='brand-color p-2 rounded text-lg font-semibold'>
                                    <TypeAnimation
                                        sequence={[
                                            'Black Friday Special: ',
                                            1000,
                                            'Black Friday Special: Now only $39',
                                            1000,
                                            'Black Friday Special: Now only $39',
                                            1000,
                                            'Black Friday Special: Now only $39',
                                            1000,
                                        ]}
                                        speed={50}
                                        repeat={Infinity}
                                    />
                                </span>
                            </div>
                            <div className='mt-5'>
                                <button onClick={toggleDrawer} className='btn brand-btn font-bold'>Get The Bundle</button>
                            </div>
                        </div>
                        <div
                            data-aos="fade-left"
                            data-aos-offset="200"
                            data-aos-delay="50"
                            data-aos-duration="1000"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="false"
                            className='flex justify-center items-center md:h-[450px] md:w-[450px] mx-auto h-[250px] w-[250px]'>
                            <div>
                                <img src={img} alt="" />
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div
                        className="grid lg:grid-cols-2 gap-4 px-4 md:px-24 py-24">
                        <div data-aos="fade-left"
                            data-aos-offset="200"
                            data-aos-delay="50"
                            data-aos-duration="1000"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="false" className='flex justify-center items-center md:h-[450px] md:w-[450px] mx-auto h-[250px] w-[250px]'>
                            <div className=''>
                                <img src={img} alt="" />
                            </div>
                        </div>
                        <div
                            data-aos="fade-right"
                            data-aos-offset="200"
                            data-aos-delay="50"
                            data-aos-duration="1000"
                            data-aos-easing="ease-in-out"
                            data-aos-mirror="true"
                            data-aos-once="false"
                            className="">
                            <h1 className='md:text-4xl text-2xl font-semibold '>Elevate Your <span className="brand-color font-bold md:text-5xl text-3xl">Winter Style</span> <br />  </h1>
                            <h1 className='md:text-4xl text-2xl font-semibold mt-2'>with Our</h1>
                            <h1 className='md:text-4xl text-2xl mt-3'>Cozy <span className="brand-color font-semibold">Beanie Bundle</span>!</h1>
                            <h3 className='text-gray-300 text-xl mt-5'>Everything in one Bundle: Unparalleled Quality, Unbeatable Price, and Fashion Forward</h3>
                            <div className='mt-3'>
                                <span className='brand-color p-2 rounded text-lg font-semibold'>
                                    <TypeAnimation
                                        sequence={[
                                            'Black Friday Special: ',
                                            1000,
                                            'Black Friday Special: Now only $39',
                                            1000,
                                            'Black Friday Special: Now only $39',
                                            1000,
                                            'Black Friday Special: Now only $39',
                                            1000,
                                        ]}
                                        speed={50}
                                        repeat={Infinity}
                                    />
                                </span>
                            </div>
                            <div className='mt-5'>
                                <button onClick={toggleDrawer} className='btn brand-btn font-bold'>Get The Bundle</button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                {/* <SwiperSlide>Slide 2</SwiperSlide> */}
            </Swiper>
            <DrawerComponent></DrawerComponent>
        </div >
    );
};

export default Banner;