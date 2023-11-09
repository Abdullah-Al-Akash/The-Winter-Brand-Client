import React, { useContext } from 'react';
import './Banner.css'
import { TypeAnimation } from 'react-type-animation';
import DrawerComponent from '../../../Sheard/Drawer/DrawerComponent';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const Banner = () => {

    const { isOpen, setIsOpen, toggleDrawer } = useContext(AuthContext);
    return (
        <div className="banner-content text-center">
            <div className="flex justify-center items-center h-[80vh]">
                <div className="">
                    <h1 className='md:text-4xl text-2xl font-semibold text-white '>Elevate Your <span className="brand-color font-bold md:text-5xl text-3xl">Winter Style</span> <br />  </h1>
                    <h1 className='md:text-4xl text-2xl font-semibold text-white mt-2'>with Our</h1>
                    <h1 className='md:text-4xl text-2xl text-white mt-3'>Cozy <span className="brand-color font-semibold">Beanie Bundle</span>!</h1>
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
            </div>
            <DrawerComponent></DrawerComponent>
        </div >
    );
};

export default Banner;