import React from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useState } from "react";
import { useEffect } from "react";
import useAxiosSecure from "./useAxiosSecure";

const UseGetCart = () => {
  const [cartProduct, setCartProduct] = useState([]);
  const { controlCart, user } = useAuth();
  const { axiosSecure } = useAxiosSecure();
  useEffect(() => {
    axiosSecure.get(`/get-cart/${user?.email}`).then((res) => {
      console.log(res?.data?.data);
      setCartProduct(res?.data?.data);
    });
  }, [controlCart]);
  return { cartProduct };
};

export default UseGetCart;
