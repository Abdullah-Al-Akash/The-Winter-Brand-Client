import React from 'react';
import ProductsComponent from '../../../Component/Main/ProductsComponent/ProductsComponent';
import HelmetSeo from '../../../Component/shared/Helmet';

const Products = () => {
    return (
        <div>
            <HelmetSeo
                title="All Products"
                canonical="all-product"
                description="all products buy from our awesome collections"
            />
            <ProductsComponent></ProductsComponent>
        </div>
    );
};

export default Products;