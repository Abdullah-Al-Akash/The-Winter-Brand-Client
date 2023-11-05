import React from 'react';
import getReady from '../../../assets/images/get-ready.png';

const GetReady = () => {
    return (
        <div className="container grid md:grid-cols-2 gap-4 mx-auto my-12 p-4">
            <div>
                <img className='rounded' src={getReady} alt="" />
            </div>
            <div className='flex items-center p-8'>
                <div>
                    <p className='brand-color'>Customize Your Subscription</p>
                    <h1 className='text-5xl font-semibold leading-tight'>Get Ready for the <br></br> <span className='brand-color'>Beanie Bundle?</span> </h1>
                    <div className='mt-6'>
                        <button className='btn brand-btn'>Get The Bundle</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetReady;