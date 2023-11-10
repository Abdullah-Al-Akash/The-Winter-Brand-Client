import React, { createContext, useContext, useEffect, useState } from "react";

export const CheckoutContext = createContext(null);

import axios from "axios";



const CheckoutProvider = ({ children }) => {

    const checkoutInfo = {

    };

    return (
        <CheckoutContext.Provider value={checkoutInfo}>{children}</CheckoutContext.Provider>
    );
};

export const useCheckoutData = () => {
    return useContext(CheckoutContext)
}


export default CheckoutProvider;
