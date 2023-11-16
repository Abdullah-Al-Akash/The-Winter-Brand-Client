import React from 'react';
import { useParams } from 'react-router-dom';

const OrderDetails = () => {
    const { id } = useParams();
    console.log(id);
    return (
        <div>
            <h3>Hello Order Details: {id}</h3>
        </div>
    );
};

export default OrderDetails;