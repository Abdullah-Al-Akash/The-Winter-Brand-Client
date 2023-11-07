import React, { useEffect, useState } from 'react';
import ProductsCard from './ProductsCard';

const ProductsComponent = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('./products.json')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            })
    }, [])
    console.log(location);
    return (
        <div className="my-10 container mx-auto">
            <h2 className="text-3xl text-center font-semibold brand-color">See Our Beanie Bundle</h2>
            <div className="grid md:grid-cols-3 gap-8 py-14 px-4">
                {
                    location.pathname === "/" ? products.slice(0, 6)?.map(product => <ProductsCard
                        key={product.id}
                        product={product}
                    ></ProductsCard>) : ''
                }
            </div>
        </div>
    );
};

export default ProductsComponent;