import React, { useEffect, useState } from 'react';
import ProductsCard from './ProductsCard';
import { BsArrowRightCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import ProductsSlider from './ProductsSlider';
import './Products.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


const ProductsComponent = () => {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        fetch('./products.json')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            })
    }, []);

    const handleTop = () => {
        window.scrollTo(0, 0)
    }

    return (
        <div className="container mx-auto">
            <h2 className="text-3xl text-center font-semibold brand-color py-8">See Our Beanie Bundle</h2>
            {
                location.pathname === '/' ? <Link onClick={handleTop} to="/products">
                    <div className='flex items-center justify-end px-8 md:pe-24 mb-4'>
                        <p className='brand-color hover:cursor-pointer'>See All Products </p>
                        <p className="ms-2 text-xl brand-color hover:cursor-pointer"><BsArrowRightCircleFill></BsArrowRightCircleFill></p>
                    </div>
                </Link>
                    : ''
            }
            <div className="md:grid md:grid-cols-3 gap-4 py-14 px-8 hidden md:px-24">
                {
                    location.pathname === "/" ? products.slice(0, 6)?.map(product => <ProductsCard key={product.id} product={product}></ProductsCard>) : products?.map(product => <ProductsCard key={product.id} product={product}></ProductsCard>)
                }
            </div>
            <div className='py-8 block md:hidden'>
                <Swiper
                    pagination={{
                        type: 'progressbar',
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {
                        products?.map(product => {
                            const { name, sale_price, regular_price, img } = product || {}
                            return <SwiperSlide>
                                <div>
                                    <div className="flex justify-center mx-auto md:p-4">
                                        <div className="card bg-base-100 shadow-2xl">
                                            <div className="flex justify-center">
                                                <img style={{ height: "250px", width: "300px" }} className="px-8" src={img} alt="Beanie" />
                                            </div>
                                            <div className="card-body">
                                                <h2 className="card-title">{name}</h2>
                                                <div className="flex justify-end my-2">
                                                    <p>Regular Price: <strike>{regular_price}</strike> </p>
                                                    <p className="text-end brand-color">Offer Price: {sale_price} </p>
                                                </div>
                                                <div className="flex justify-end mt-2">
                                                    <button className="btn brand-btn">Add to Cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        })
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default ProductsComponent;
