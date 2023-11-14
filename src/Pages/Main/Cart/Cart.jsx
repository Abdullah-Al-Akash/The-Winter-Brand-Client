import React, { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useAuth } from "../../../AuthProvider/AuthProvider";
import { useState } from "react";

const Cart = () => {
  const { axiosSecure } = useAxiosSecure();
  const [items, setItems] = useState([]);
  const { user } = useAuth();
  // const items = [
  //   {
  //     image: "image",
  //     name: "Product Name",
  //     description:
  //       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde quaerat porro quia inventore, id voluptatum dolorem. Ducimus fugiat et, iste ea recusandae similique eligendi cupiditate excepturi aliquid id cum in.",
  //     available_quantity: 12,
  //     price: 20,
  //   },
  //   {
  //     image: "image",
  //     name: "Product Name",
  //     description:
  //       "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde quaerat porro quia inventore, id voluptatum dolorem. Ducimus fugiat et, iste ea recusandae similique eligendi cupiditate excepturi aliquid id cum in.",
  //     available_quantity: 12,
  //     price: 20,
  //   },
  // ];

  useEffect(() => {
    axiosSecure
      .get(`get-cart/${user.email}`)
      .then((res) => {
        items(res?.data?.data);
        console.log(res?.data?.data);
      })
      .catch((err) => {
        console.log(err?.message);
      });
  }, []);
  console.log(items);
  return (
    <div className="max-w-[1200px] mx-auto">
      <h2 className="my-10 md:text-5xl text-xl ms-2">My Cart Page</h2>
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-8 col-span-12 p-10">
          <div className="flex justify-between items-center">
            <span className="font-bold">{items?.length} item Added</span>
            {/* <span className="font-bold">Total: ${totalPrice}</span> */}
          </div>
          {items.map((item, i) => {
            return (
              <div key={i} className="p-2 border mt-4">
                <div className="flex justify-between items-start">
                  <div className="flex justify-start items-start gap-2">
                    <img src={item?.image} alt="image" />
                    <div className="flex flex-col justify-between items-start">
                      <div>
                        <h3 className="text-red-500 font-bold">{item?.name}</h3>
                        <p>{item?.description}</p>
                      </div>
                      <div>+ and -</div>
                    </div>
                  </div>
                  <div>
                    <h2>${item?.price}</h2>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="md:col-span-4 col-span-12 p-10 flex flex-col gap-2">
          <h3 className="text-black font-bold">Product Details</h3>
          <div>
            <div className="flex justify-between items-start">
              <p>Total Price</p>
              {/* <p>{totalPrice}</p> */}
            </div>
            <div className="flex justify-between items-start">
              <p>Discount</p>
              <p>0</p>
            </div>
            <div className="flex justify-between items-start">
              <p>Tex</p>
              <p>0</p>
            </div>
            <hr />
            <div className="flex justify-between items-start mt-5">
              <p>Order Total</p>
              {/* <p>${totalPrice}</p> */}
            </div>
            <button className="brand-btn mt-5 w-full py-1">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
