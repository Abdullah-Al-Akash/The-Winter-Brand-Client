import React from "react";
import { BsCartPlus } from "react-icons/bs";

const ProductsCard = ({ product }) => {
  const { name, sale_price, regular_price, img } = product;
  return (
    <div className="flex justify-center xxl:w-96 w-full lg:mx-auto  border relative">
      <span className="absolute top-0 left-0 px-2 brand-bg">For Sell</span>
      <div className="border-none shadow-xl flex flex-col justify-between w-full">
        <div className="flex justify-center">
          <img
            style={{ height: "300px", width: "350px" }}
            className="px-8"
            src={img}
            alt="Beanie"
          />
        </div>
        <div className="card-body">
          <h2 className="text-[16px] font-semibold">{name}</h2>
          <div className="flex justify-end my-2">
            <p>
              Regular Price: <strike>{regular_price}</strike>{" "}
            </p>
            <p className="text-end brand-color">Offer Price: {sale_price} </p>
          </div>
        </div>
        <button className="bg-black border text-white py-2 flex justify-center items-center gap-2">
          <BsCartPlus></BsCartPlus> <span className="mt-1">Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductsCard;
