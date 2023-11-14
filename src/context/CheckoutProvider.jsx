import React, { createContext, useContext, useEffect, useState } from "react";

export const CheckoutContext = createContext(null);


const CheckoutProvider = ({ children }) => {
    const [checkoutData, setCheckoutData] = useState({})
    const checkoutInfo = {
        checkoutData,
        setCheckoutData
    };
    useEffect(() => {
        const checkoutInformation = localStorage.getItem("checkout")
        setCheckoutData(JSON.parse(checkoutInformation))
    }, [])
    return (
        <CheckoutContext.Provider value={checkoutInfo}>{children}</CheckoutContext.Provider>
    );
};

export const useCheckoutData = () => {
    return useContext(CheckoutContext)
}


export default CheckoutProvider;
