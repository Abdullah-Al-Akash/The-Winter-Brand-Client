import React, { createContext, useContext, useEffect, useState } from "react";

export const CheckoutContext = createContext(null);


const CheckoutProvider = ({ children }) => {
    const [checkoutData, setCheckoutData] = useState({})
    const [control, setControl] = useState(true)

    useEffect(() => {
        const checkoutInformation = localStorage.getItem("checkout")
        setCheckoutData(JSON.parse(checkoutInformation))
    }, [control])

    const checkoutInfo = {
        checkoutData,
        setCheckoutData,
        control,
        setControl
    };

    return (
        <CheckoutContext.Provider value={checkoutInfo}>{children}</CheckoutContext.Provider>
    );
};

export const useCheckoutData = () => {
    return useContext(CheckoutContext)
}


export default CheckoutProvider;
