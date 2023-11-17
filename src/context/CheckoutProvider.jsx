import React, { createContext, useContext, useEffect, useState } from "react";

import { cookies } from "../AuthProvider/AuthProvider";
export const CheckoutContext = createContext(null);


const CheckoutProvider = ({ children }) => {
    const [checkoutData, setCheckoutData] = useState({})
    const [control, setControl] = useState(true)

    useEffect(() => {
        const checkoutData = cookies.get("data")
        setCheckoutData(checkoutData)
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
