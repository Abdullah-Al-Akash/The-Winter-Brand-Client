import React, { useEffect, useState } from 'react';
import ProductsCard from './ProductsCard';
import { BsArrowRightCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

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
                    <div className='flex items-center justify-end px-8 md:pe-8'>

                        <p className='brand-color hover:cursor-pointer'>See All Products </p>
                        <p className="ms-2 text-xl brand-color hover:cursor-pointer"><BsArrowRightCircleFill></BsArrowRightCircleFill></p>
                    </div>
                </Link>
                    : ''
            }
            <div className="grid md:grid-cols-3 gap-8 py-14">
                {
                    location.pathname === "/" ? products.slice(0, 6)?.map(product => <ProductsCard
                        key={product.id}
                        product={product}
                    ></ProductsCard>) : products?.map(product => <ProductsCard
                        key={product.id}
                        product={product}
                    ></ProductsCard>)
                }
            </div>
        </div>
    );
};

export default ProductsComponent;