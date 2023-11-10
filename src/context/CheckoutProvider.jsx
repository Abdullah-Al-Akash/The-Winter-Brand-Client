import React, { createContext, useContext, useEffect, useState } from "react";

export const CheckoutContext = createContext(null);

import axios from "axios";



const CheckoutProvider = ({ children }) => {
    const [checkoutData, setCheckoutData] = useState({})
    const checkoutInfo = {
        checkoutData,
        setCheckoutData
    };

    return (
        <CheckoutContext.Provider value={checkoutInfo}>{children}</CheckoutContext.Provider>
    );
};

export const useCheckoutData = () => {
    return useContext(CheckoutContext)
}


export default CheckoutProvider;
